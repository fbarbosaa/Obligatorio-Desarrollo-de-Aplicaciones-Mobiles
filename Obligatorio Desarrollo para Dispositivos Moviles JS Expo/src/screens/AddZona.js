import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import DatabaseConnection from "../database/db-connection";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const AddZona = () => {
  const [idZona, setIdZona] = useState("");
  const [lugar, setLugar] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [cantidadTrabajadores, setCantidadTrabajadores] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const navigation = useNavigation();

  const handleIdZona = (idZona) => {
    setIdZona(idZona);
  };

  const handleLugar = (value) => {
    setLugar(value);
  };

  const handleDepartamento = (departamento) => {
    setDepartamento(departamento);
  };

  const handleCantidadTrabajadores = (cantidadTrabajadores) => {
    setCantidadTrabajadores(cantidadTrabajadores);
  };

  const handleLatitud = (latitud) => {
    setLatitud(latitud);
  };

  const handleLongitud = (longitud) => {
    setLongitud(longitud);
  };

  const addZona = () => {
    console.log("### add zona ###");

    if (validateData()) {
      console.log("### save zona ###");

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM zonasT WHERE idZona = ?',
          [idZona],
          (tx, results) => {
            if (results.rows.length > 0) {
              Alert.alert("Error", "El identificador ya está en uso");
            } else {
              tx.executeSql(
                "INSERT INTO zonasT (idZona, lugar, departamento, cantidadTrabajadores, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?)",
                [idZona, lugar, departamento, cantidadTrabajadores, latitud, longitud],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      "Éxito",
                      "Zona agregada correctamente",
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
                    Alert.alert("Error", "Error al agregar la zona");
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
    if (idZona === "" && !idZona.trim()) {
      Alert.alert("Error", "El identificador de la zona es obligatorio");
      return false;
    }

    if (lugar === "" && !lugar.trim()) {
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    if (departamento === "" && !departamento.trim()) {
      Alert.alert("Error", "El departamento es obligatorio");
      return false;
    }

    if (cantidadTrabajadores === "" && !cantidadTrabajadores.trim()) {
      Alert.alert("Error", "La cantidad de trabajadores es obligatoria");
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

    return true;
  };

  const clearData = () => {
    setIdZona("");
    setLugar("");
    setDepartamento("");
    setCantidadTrabajadores("");
    setLatitud("");
    setLongitud("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>

              <MyInputText
                styles={styles.inputIdZona}
                placeholder="Identificador de la zona"
                onChangeText={handleIdZona}
                keyboardType="numeric"
                value={idZona}
              />

              <ModalSelector
                data={[
                  { key: 0, label: "Estancia" },
                  { key: 1, label: "Quinta" },
                  { key: 2, label: "Plantación" },
                ]}
                initValue="Seleccionar lugar"
                onChange={(option) => handleLugar(option.label)}
                style={styles.modalSelector}
                selectTextStyle={styles.modalSelectorText}
                optionTextStyle={styles.modalSelectorText}
                cancelStyle={styles.modalSelectorCancel}
              >
                <MyInputText
                  styles={styles.inputLugar}
                  placeholder="Lugar"
                  value={lugar}
                  editable={false}
                />
              </ModalSelector>
              <MyInputText
                styles={styles.inputDepartamento}
                placeholder="Departamento"
                onChangeText={handleDepartamento}
                value={departamento}
              />

              <MyInputText
                styles={styles.inputCantidadTrabajadores}
                placeholder="Cantidad de Trabajadores"
                keyboardType="numeric"
                onChangeText={handleCantidadTrabajadores}
                value={cantidadTrabajadores}
              />

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

              <MySingleButton
                title="Agregar Zona"
                btnColor="green"
                onPress={addZona}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddZona;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232222",
    flex: 1,
  },
  modalSelector: {
  },
  modalSelectorText: {
    color: "black",
  },
  modalSelectorCancel: {
    backgroundColor: "red",
    color: "black"
  },
  inputLugar: {},
  inputDepartamento: {},
  inputCantidadTrabajadores: {},
  inputLatitud: {},
  inputLongitud: {},
});
