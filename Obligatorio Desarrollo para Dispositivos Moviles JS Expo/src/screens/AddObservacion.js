import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import MyInputText from "../components/MyInputText";
import ModalSelector from "react-native-modal-selector";
import MySingleButton from "../components/MySingleButton";
import DatabaseConnection from "../database/db-connection";
import { useNavigation } from "@react-navigation/native";

const db = DatabaseConnection.getConnection();

const AddObservacion = () => {
  const [IdObs, setIdObs] = useState("");
  const [titulo, setTitulo] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [foto, setFoto] = useState(null);

  const navigation = useNavigation();

  const handleIdObs = (IdObs) => {
    setIdObs(IdObs);
  };

  const handleTitulo = (titulo) => {
    setTitulo(titulo);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  };

  const handleFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      Alert.alert(
        "Acceso denegado",
        "Se requiere acceso a la galería de imágenes para seleccionar una foto"
      );
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };
  

  const addObservacion = () => {
    console.log("### add observacion ###");

    if (validateData()) {
      console.log("### save observacion ###");

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM ObservacionT WHERE idObs = ?',
          [IdObs],
          (tx, results) => {
            if (results.rows.length > 0) {
              Alert.alert("Error", "El id de la observacion ya está en uso");
            } else {
              tx.executeSql(
          "INSERT INTO observacionT (idObs, titulo, latitud, longitud, foto) VALUES (?, ?, ?, ?, ?)",
          [IdObs, titulo, latitud, longitud, foto],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Éxito",
                "Observación agregada correctamente",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("HomeScreen"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
              clearData();
            } else {
              Alert.alert("Error", "Error al agregar la observación");
            }
          }
        );
            }
          }
        );
      });
    }
  };

  const validateData = () => {
    if (IdObs === "" &&!IdObs.trim()) {
          Alert.alert("Error", "Ingrese el identificador de la observación");
          return false;
        }


    if (titulo === "" && !titulo.trim()) {
      Alert.alert("Error", "Ingrese el título de la observación");
      return false;
    }

    if (latitud === "" && !latitud.trim()) {
      Alert.alert("Error", "La latitud es obligatoria");
      return false;
    }

    if (longitud === "" && !longitud.trim()) {
      Alert.alert("Error", "La longitud es obligatoria");
      return false;
    }

    if (foto === null) {
      Alert.alert("Error", "Seleccione una foto de la galería");
      return false;
    }

    return true;
  };

  const clearData = () => {
    setIdObs("");
    setTitulo("");
    setLatitud("");
    setLongitud("");
    setFoto(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <KeyboardAvoidingView>
            
          <MyInputText
              styles={styles.inputIdObs}
              placeholder="Identificador"
              keyboardType="numeric"
              onChangeText={handleIdObs}
              value={IdObs}
            />
                  <ModalSelector
                data={[
                  { key: 0, label: "Plaga detectada" },
                  { key: 1, label: "Planta en mal estado" },
                  { key: 2, label: "Falta de riego" },
                ]}
                initValue="Seleccionar Titulo"
                onChange={(option) => handleTitulo(option.label)}
                style={styles.modalSelector}
                selectTextStyle={styles.modalSelectorText} 
                optionTextStyle={styles.modalSelectorText}
                cancelStyle={styles.modalSelectorCancel} 
              >
                <MyInputText
                  styles={styles.inputTitulo}
                  placeholder="Titulo"
                  value={titulo}
                  editable={false}
                />
              </ModalSelector>

            <MyInputText
              styles={styles.inputLatitud}
              placeholder="Latitud"
              keyboardType="numeric"
              onChangeText={handleLatitud}
              value={latitud}
            />

            <MyInputText
              styles={styles.inputLongitud}
              placeholder="Longitud"
              keyboardType="numeric"
              onChangeText={handleLongitud}
              value={longitud}
            />

            <TouchableOpacity onPress={handleFoto} style={styles.photoButton}>
              {foto ? (
                <Image source={{ uri: foto }} style={styles.photoPreview} />
              ) : (
                <Text style={styles.photoButtonText}>Seleccionar Foto</Text>
              )}
            </TouchableOpacity>

            <MySingleButton
              title="Agregar Observación"
              btnColor="green"
              onPress={addObservacion}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddObservacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  inputTitulo: {
  },
  inputLatitud: {
  },
  inputLongitud: {
  },
  photoButton: {
    backgroundColor: "#518a72",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 218,
    marginLeft: 31,
    marginRight: 35,
    marginVertical: 10,
    borderRadius: 5,
  },
  photoButtonText: {
    fontSize: 16,
    color: "white",
  },
  photoPreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  modalSelector: {
  },
  modalSelectorText: {
    color: "black",
  },
  modalSelectorCancel: {
    backgroundColor: "red", 
    color: "black"
  }
});
