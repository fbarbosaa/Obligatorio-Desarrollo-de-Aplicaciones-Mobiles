import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../components/MyText';
import MyInputText from '../components/MyInputText';
import MySingleButton from '../components/MySingleButton';

import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteObservacion = () => {
  const [IdObs, setIdObs] = useState("");
  const navigation = useNavigation();

  const deleteObservacion = () => {
    if (!IdObs || IdObs === "") {
      Alert.alert("Error", "El identificador de la observacion es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM observacionT WHERE IdObs = ?',
        [IdObs],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Éxito", "Observacion eliminada correctamente", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeScreen"),
              }
            ],
              {
                cancelable: false
              }
            );
          } else {
            Alert.alert("Error", "La observacion no existe", [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeScreen"),
              }
            ],
              {
                cancelable: false
              }
            )
          }
        }
      );
    });

  }

  const handleIdObs = (observacion) => {
    setIdObs(observacion);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Búsqueda de Observacion:" textStyle={styles.textStyle} />
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Identificador de la observacion"
                onChangeText={handleIdObs}
                value={IdObs}
                keyboardType='numeric'
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteObservacion}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteObservacion;

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
  inputStyle: {
    padding: 10,
  },
  textStyle: {
    padding: 10,
    marginLeft: 25,
    color: 'white',
    fontSize: 15
  },
});
