import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyInputText from '../components/MyInputText';
import MySingleButton from '../components/MySingleButton';

import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = () => {
  const [cedula, setCedula] = useState("");
  const navigation = useNavigation();

  const deleteUser = () => {
    if(!cedula && !cedula.length && cedula === ""){
      Alert.alert("Error", "La cédula del usuario es obligatoria");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM persona WHERE cedula = ?',
        [cedula],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Usuario borrado correctamente", [
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
            Alert.alert("Error", "El usuario no existe", [
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

  const handleCedula = (cedula) => {
    setCedula(cedula);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Cédula de identidad"
                onChangeText={handleCedula}
                keyboardType="numeric"
                value={cedula}
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteUser

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
    color: 'black',
    fontSize: 20,
  },
})