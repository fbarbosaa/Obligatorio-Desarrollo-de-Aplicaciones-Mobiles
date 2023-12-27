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
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const EditUser = () => {
  const [cedulaSearch, setCedulaSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [apellido, setApellido] = useState("");
  const navigation = useNavigation();

  const handleCedulaSearch = (cedula) => {
    setCedulaSearch(cedula);
  };

  const handleUserName = (userName) => {
    setUserName(userName);
  };

  const handleApellido = (apellido) => {
    setApellido(apellido);
  };

  const validateData = () => {
    if (!userName && !userName.length && userName === "" && !userName.trim()) {
      Alert.alert("Error", "El nombre de usuario es obligatorio");
      return false;
    }

    if (!cedulaSearch && !cedulaSearch.length && cedulaSearch === "" && !cedulaSearch.trim()) {
      Alert.alert("Error", "La cédula es obligatoria");
      return false;
    }

    if (!apellido && !apellido.length && !apellido.trim()) {
      Alert.alert("Error", "El apellido es obligatorio");
      return false;
    }

    return true;
  };

  const clearCedulaSearch = () => {
    setCedulaSearch("");
  };

  const clearData = () => {
    setUserName("");
    setApellido("");
  };

  const editUser = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE persona SET userName=?, apellido=? WHERE cedula=?",
          [userName, apellido, cedulaSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert(
                "Éxito",
                "Usuario actualizado correctamente",
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
            } else {
              Alert.alert("Error", "Error al actualizar el usuario");
            }
          }
        );
      });
    }
  };

  const searchUser = () => {
    if (!cedulaSearch.trim() && cedulaSearch === "") {
      Alert.alert("Error", "La cédula es requerida");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM persona WHERE cedula = ?",
        [cedulaSearch],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setUserName(user.userName);
            setApellido(user.apellido);
          } else {
            Alert.alert("Error", "Usuario no encontrado");
            clearCedulaSearch();
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
              <MyText textValue="Buscar usuario:" textStyle={styles.textStyle} />

              <MyInputText
                placeholder="Ingrese la cédula del usuario"
                onChangeText={handleCedulaSearch}
                styles={styles.input}
                keyboardType="numeric"
                value={cedulaSearch}
              />

              <MySingleButton
                title="Buscar"
                onPress={searchUser}
                btnColor="#4922a3"
              />

              <MyInputText
                placeholder="Nombre de usuario"
                value={userName}
                onChangeText={handleUserName}
              />

              <MyInputText
                placeholder="Apellido"
                value={apellido}
                onChangeText={handleApellido}
              />

              <MySingleButton
                title="Editar"
                onPress={editUser}
                btnColor="blue"
              />
              
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#232222",
  },
  generalView: {
    flex: 1,
  },
  textStyle: {
    padding: 10,
    marginLeft: 20,
    color: "white",
    fontSize: 15,
  },
  input: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
