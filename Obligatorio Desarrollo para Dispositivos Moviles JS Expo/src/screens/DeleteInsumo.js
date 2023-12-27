import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MyText from '../components/MyText';
import MyInputText from '../components/MyInputText';
import MySingleButton from '../components/MySingleButton';

import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteInsumo = () => {
  const [insumoId, setInsumoId] = useState("");
  const navigation = useNavigation();

  const deleteInsumo = () => {
    if (!insumoId || insumoId === "") {
      Alert.alert("Error", "El identificador del insumo es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM insumosT WHERE insumoId = ?',
        [insumoId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Éxito", "Insumo eliminado correctamente", [
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
            Alert.alert("Error", "El insumo no existe", [
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

  const handleInsumoId = (insumo) => {
    setInsumoId(insumo);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText textValue="Búsqueda de Insumo:" textStyle={styles.textStyle} />
            <KeyboardAvoidingView>

              <MyInputText
                placeholder="Identificador del insumo"
                onChangeText={handleInsumoId}
                value={insumoId}
                keyboardType='numeric'
                styles={styles.inputStyle}
              />

              <MySingleButton
                title="Borrar"
                onPress={deleteInsumo}
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteInsumo;

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
    color: 'white',
    fontSize: 15
  },
});
