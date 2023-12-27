import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../components/MyText';
import MyInputText from '../components/MyInputText';
import MySingleButton from '../components/MySingleButton';

import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteZona = () => {
  const [idZona, setIdZona] = useState("");
  const navigation = useNavigation();

  const deleteZona = () => {
    if (idZona === "" &&!idZona.trim()) {
      Alert.alert("Error", "El identificador de la zona es obligatorio");
      return false;
    }


    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM zonasT WHERE idZona = ?',
        [idZona],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Éxito",
              "Zona eliminada correctamente",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("HomeScreen"),
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Error",
              "La zona no existe",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("HomeScreen"),
                }
              ],
              { cancelable: false }
            );
          }
        }
      );
    });
  };
  const handleIdZona = (idZona) => {
    setIdZona(idZona);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Eliminar Zona:" textStyle={styles.textStyle} />
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Identificador de la zona"
                onChangeText={handleIdZona}
                value={idZona}
                keyboardType="numeric"
                style={styles.inputStyle}
              />
              <MySingleButton title="Eliminar" onPress={deleteZona} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteZona;

const styles = StyleSheet.create({
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
  inputStyle: {
    padding: 10,
  },
  textStyle: {
    padding: 10,
    marginLeft: 25,
    color: "white",
    fontSize: 15
  },
});
