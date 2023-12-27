import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import DatabaseConnection from "../database/db-connection";
import { Calendar } from 'react-native-calendars';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const AddTratamiento = () => {
  const [idTratamiento, setIdTratamiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ordenDeTrabajo, setOrdenDeTrabajo] = useState("");
  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const [idZona, setIdZona] = useState("");
  const [insumoId, setInsumoId] = useState("");
  const [idObs, setIdObs] = useState("");
  const navigation = useNavigation();

  const handleIdTratamiento = (idTratamiento) => {
    setIdTratamiento(idTratamiento);
  };

  const handleNombre = (nombre) => {
    setNombre(nombre);
  };

  const handleTiempo = (tiempo) => {
    setTiempo(tiempo);
  };

  const handleFechaInicio = (fechaInicio) => {
    setFechaInicio(fechaInicio);
  };

  const handleFechaFin = (fechaFin) => {
    setFechaFin(fechaFin);
  };

  const handleCedulaUsuario = (cedulaUsuario) => {
    setCedulaUsuario(cedulaUsuario);
  };

  const handleOrdenDeTrabajo = async () => {
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
      setOrdenDeTrabajo(result.assets[0].uri);
    }
  };

  const addTratamiento = () => {
    console.log("### add tratamiento ###");

    if (validateData()) {
      console.log("### save tratamiento ###");

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM persona WHERE cedula = ?",
          [cedulaUsuario],
          (tx, results) => {
            if (results.rows.length > 0) {
              tx.executeSql(
                "SELECT * FROM zonasT WHERE idZona = ?",
                [idZona],
                (tx, results) => {
                  if (results.rows.length > 0) {
                    tx.executeSql(
                      "SELECT * FROM insumosT WHERE insumoId = ?",
                      [insumoId],
                      (tx, results) => {
                        if (results.rows.length > 0) {
                          tx.executeSql(
                            "SELECT * FROM observacionT WHERE idObs = ?",
                            [idObs],
                            (tx, results) => {
                              if (results.rows.length > 0) {
                                tx.executeSql(
                                  "INSERT INTO tratami (idTratamiento, nombre, tiempo, fechaInicio, fechaFin, ordenDeTrabajo, cedulaUsuario, idZona, insumoId, idObs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                                  [
                                    idTratamiento,
                                    nombre,
                                    tiempo,
                                    fechaInicio,
                                    fechaFin,
                                    ordenDeTrabajo,
                                    cedulaUsuario,
                                    idZona,
                                    insumoId,
                                    idObs,
                                  ],
                                  (tx, results) => {
                                    if (results.rowsAffected > 0) {
                                      Alert.alert(
                                        "Éxito",
                                        "Tratamiento agregado correctamente",
                                        [
                                          {
                                            text: "Ok",
                                            onPress: () =>
                                              navigation.navigate("HomeScreen"),
                                          },
                                        ],
                                        {
                                          cancelable: false,
                                        }
                                      );
                                      clearData();
                                    } else {
                                      Alert.alert(
                                        "Error",
                                        "Error al agregar el tratamiento"
                                      );
                                    }
                                  }
                                );
                              } else {
                                Alert.alert(
                                  "Error",
                                  "El identificador de la observación no existe"
                                );
                              }
                            }
                          );
                        } else {
                          Alert.alert(
                            "Error",
                            "El identificador del insumo no existe"
                          );
                        }
                      }
                    );
                  } else {
                    Alert.alert(
                      "Error",
                      "El identificador de la zona no existe"
                    );
                  }
                }
              );
            } else {
              Alert.alert(
                "Error",
                "La cédula de usuario no existe"
              );
            }
          }
        );
      });
    }
  };
  const validateData = () => {
    if (idTratamiento === "" && !idTratamiento.trim()) {
      Alert.alert("Error", "El id del tratamiento es obligatorio");
      return false;
    }

    if (nombre === "" && !nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return false;
    }

    if (tiempo === "" && !tiempo.trim()) {
      Alert.alert("Error", "El tiempo es obligatorio");
      return false;
    }

    if (fechaInicio === "" && !fechaInicio.trim()) {
      Alert.alert("Error", "La fecha de inicio es obligatoria");
      return false;
    }

    if (fechaFin === "" && !fechaFin.trim()) {
      Alert.alert("Error", "La fecha de fin es obligatoria");
      return false;
    }

    if (ordenDeTrabajo === "" && !ordenDeTrabajo.trim()) {
      Alert.alert("Error", "La orden de trabajo es obligatoria");
      return false;
    }

    if (cedulaUsuario === "" && !cedulaUsuario.trim()) {
      Alert.alert("Error", "La cédula de usuario es obligatoria");
      return false;
    }

    if (idZona === "" && !idZona.trim()) {
      Alert.alert("Error", "El identificador de la zona es obligatorio");
      return false;
    }

    if (insumoId === "" && !insumoId.trim()) {
      Alert.alert("Error", "El identificador del insumo es obligatorio");
      return false;
    }

    if (idObs === "" && !idObs.trim()) {
      Alert.alert("Error", "El idenfiticador de la observación es obligatorio");
      return false;
    }

    return true;
  };

  const clearData = () => {
    setIdTratamiento("");
    setNombre("");
    setTiempo("");
    setFechaInicio("");
    setFechaFin("");
    setOrdenDeTrabajo("");
    setCedulaUsuario("");
    setIdZona("");
    setInsumoId("");
    setIdObs("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.innerContainer}>
          <MyInputText
            styles={styles.inputIdTratamiento}
            placeholder="Identificador del tratamiento"
            onChangeText={handleIdTratamiento}
            value={idTratamiento}
            keyboardType="numeric"
          />

          <MyInputText
            styles={styles.inputNombre}
            placeholder="Nombre del tratamiento"
            onChangeText={handleNombre}
            value={nombre}
          />

          <MyInputText
            styles={styles.inputTiempo}
            placeholder="Tiempo (horas de ejecucion)"
            onChangeText={handleTiempo}
            keyboardType="numeric"
            value={tiempo}
          />

          <MyInputText
            styles={styles.inputFechaInicio}
            placeholder="Fecha de inicio"
            onChangeText={handleFechaInicio}
            value={fechaInicio}
          />

          <MyInputText
            styles={styles.inputFechaFin}
            placeholder="Fecha de fin"
            onChangeText={handleFechaFin}
            value={fechaFin}
          />

          <MyInputText
            styles={styles.inputCedulaUsuario}
            placeholder="Cédula de usuario"
            onChangeText={handleCedulaUsuario}
            value={cedulaUsuario}
            keyboardType="numeric"
          />



          <MyInputText
            styles={styles.inputIdZona}
            placeholder="Id de la zona"
            onChangeText={(idZona) => setIdZona(idZona)}
            value={idZona}
            keyboardType="numeric"
          />

          <MyInputText
            styles={styles.inputInsumoId}
            placeholder="Id del insumo"
            onChangeText={(insumoId) => setInsumoId(insumoId)}
            value={insumoId}
            keyboardType="numeric"
          />

          <MyInputText
            styles={styles.inputIdObs}
            placeholder="Id de la observación"
            onChangeText={(idObs) => setIdObs(idObs)}
            value={idObs}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={handleOrdenDeTrabajo} style={styles.photoButton}>
            {ordenDeTrabajo ? (
              <Image source={{ uri: ordenDeTrabajo }} style={styles.photoPreview} />
            ) : (
              <Text style={styles.photoButtonText}>Seleccionar Orden de trabajo</Text>
            )}
          </TouchableOpacity>

          <MySingleButton
            title="Agregar Tratamiento"
            btnColor="green"
            onPress={addTratamiento}
          />

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTratamiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  inputIdTratamiento: {},
  inputNombre: {},
  inputTiempo: {},
  inputFechaInicio: {},
  inputFechaFin: {},
  inputCedulaUsuario: {},
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
  inputIdZona: {},
  inputInsumoId: {},
  inputIdObs: {},
});
