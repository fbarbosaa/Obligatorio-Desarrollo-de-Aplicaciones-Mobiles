import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../components/MyText";
import ModalSelector from "react-native-modal-selector";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../database/db-connection";

const db = DatabaseConnection.getConnection();
const EditZona = () => {
  const [idZonaSearch, setIdZonaSearch] = useState("");
  const [lugar, setLugar] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [cantidadTrabajadores, setCantidadTrabajadores] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const navigation = useNavigation();


  const handleIdZonaSearch = (idZonaSearch) => {
    setIdZonaSearch(idZonaSearch);
  };
  const handleLugar = (lugar) => {
    setLugar(lugar);
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

  const validateData = () => {
    if (!lugar || !lugar.trim()) {
      Alert.alert("Error", "El lugar es obligatorio");
      return false;
    }

    if (!departamento || !departamento.trim()) {
      Alert.alert("Error", "El departamento es obligatorio");
      return false;
    }

    if (!cantidadTrabajadores || !cantidadTrabajadores.trim()) {
      Alert.alert("Error", "La cantidad de trabajadores es obligatoria");
      return false;
    }

    if (!latitud || !latitud.trim()) {
      Alert.alert("Error", "La latitud es obligatoria");
      return false;
    }

    if (!longitud || !longitud.trim()) {
      Alert.alert("Error", "La longitud es obligatoria");
      return false;
    }

    return true;
  };

  const clearIdZonaSearch = () => {
    setIdZonaSearch("");
  };

  const clearData = () => {
    setLugar("");
    setDepartamento("");
    setCantidadTrabajadores("");
    setLatitud("");
    setLongitud("");
  };

  const editZona = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE zonasT SET lugar = ?, departamento = ?, cantidadTrabajadores = ?, latitud = ?, longitud = ? WHERE idZona=?",
          [lugar, departamento, cantidadTrabajadores, latitud, longitud, idZonaSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                "Éxito",
                "Zona actualizada correctamente",
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
              Alert.alert("Error", "Error al actualizar la zona");
            }
          }
        );
      });
    }
  };

  const searchZona = () => {
    if (!idZonaSearch.trim()) {
      Alert.alert("Error", "El identificador de la zona es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zonasT WHERE idZona=?",
        [idZonaSearch],
        (_, results) => {
          if (results.rows.length > 0) {
            const zona = results.rows.item(0);
            setLugar(zona.lugar);
            setDepartamento(zona.departamento);
            setCantidadTrabajadores(zona.cantidadTrabajadores.toString());
            setLatitud(zona.latitud.toString());
            setLongitud(zona.longitud.toString());
          } else {
            Alert.alert("Error", "Zona no encontrada");
            clearIdZonaSearch();
          }
        }
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText
                textValue="Buscar zona:"
                textStyle={styles.textStyle}
              />
                <MyInputText
                placeholder="Identificador de la zona"
                value={idZonaSearch}
                onChangeText={handleIdZonaSearch}
                keyboardType="numeric"
              />

              <MySingleButton
                title="Buscar"
                onPress={searchZona}
                btnColor="#4922a3"
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
                placeholder="Departamento"
                value={departamento}
                onChangeText={handleDepartamento}
              />

              <MyInputText
                placeholder="Cantidad de Trabajadores"
                keyboardType="numeric"
                value={cantidadTrabajadores}
                onChangeText={handleCantidadTrabajadores}
              />

              <MyInputText
                placeholder="Ingrese la latitud"
                onChangeText={handleLatitud}
                styles={styles.input}
                value={latitud}
              />
              <MyInputText
                placeholder="Ingrese la longitud"
                onChangeText={handleLongitud}
                styles={styles.input}
                value={longitud}
              />

              <MySingleButton
                title="Editar Zona"
                onPress={editZona}
                btnColor="blue"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditZona;

const styles = StyleSheet.create({
  modalSelectorText: {
    color: "black",
  },
  modalSelectorCancel: {
    backgroundColor: "red",
    color: "black"
  },
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  viewContainer: {
    flex: 1,
  },
  generalView: {
    flex: 1,
  },
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "white",
    fontSize: 15
  },
  input: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
