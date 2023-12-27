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

import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import DatabaseConnection from "../database/db-connection";
import { useNavigation } from "@react-navigation/native";
const db = DatabaseConnection.getConnection();

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [cedula, setCedula] = useState("");
  const [apellido, setApellido] = useState("");
  const navigation = useNavigation();

  const handleUserName = (userName) => {
    setUserName(userName);
  }

  const handleCedula = (cedula) => {
    setCedula(cedula);
  }

  const handleApellido = (apellido) => {
    setApellido(apellido);
  }

  const addUser = () => {
    console.log("### add user ###");

    if (validateData()) {
      console.log("### save user ###");
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM persona WHERE cedula = ?',
          [cedula],
          (tx, results) => {
            if (results.rows.length > 0) {
              Alert.alert("Error", "La cédula ya está en uso");
            } else {
              tx.executeSql(
                'INSERT INTO persona (userName, cedula, apellido) VALUES (?, ?, ?)',
                [userName, cedula, apellido],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    Alert.alert("Éxito", "Usuario agregado correctamente", [
                      {
                        text: "Ok",
                        onPress: () => navigation.navigate("HomeScreen"),
                      }
                    ],
                      {
                        cancelable: false
                      });
                    clearData();
                  } else {
                    Alert.alert("Error", "Error al agregar el usuario");
                  }
                }
              );
            }
          }
        );
      });
    }
  }

  const validateData = () => {
    if (userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if (cedula === "" && !cedula.trim()) {
      Alert.alert("Error", "La cedula es obligatoria");
      return false;
    }

    if (apellido === "" && !apellido.trim()) {
      Alert.alert("Error", "La contraseña es obligatoria");
      return false;
    }

    return true;
  }

  const clearData = () => {
    setUserName("");
    setCedula("");
    setApellido("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>

              <MyInputText
                styles={styles.inputUser}
                placeholder="Nombre de usuario"
                onChangeText={handleUserName}
                value={userName}
              />

              <MyInputText
                styles={styles.inputApellido}
                placeholder="Apellido de usuario"
                minLength={8}
                maxLength={16}
                onChangeText={handleApellido}
                value={apellido}
              />

              <MyInputText
                styles={styles.inputCedula}
                placeholder="Cédula de Usuario"
                keyboardType="numeric"
                onChangeText={handleCedula}
                value={cedula}
              />

              <MySingleButton
                title="Agregar Usuario"
                btnColor="green"
                onPress={addUser}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  inputUser: {},
  inputCedula: {},
  inputApellido: {}
});
