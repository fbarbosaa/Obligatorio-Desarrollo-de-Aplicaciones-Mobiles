import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import MyInputText from '../components/MyInputText';
import MySingleButton from '../components/MySingleButton';
import MyText from '../components/MyText';

import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();

const DeleteTratamiento = () => {
  const [idTratamiento, setIdTratamiento] = useState("");
  const navigation = useNavigation();

  const deleteTratamiento = () => {
    if(!idTratamiento && !idTratamiento.length && idTratamiento === ""){
      Alert.alert("Error", "El id del tratamiento es obligatorio");
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tratami WHERE idTratamiento = ?',
        [idTratamiento],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert("Exito", "Tratamiento borrado correctamente", [
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
            Alert.alert("Error", "El tratamiento no existe", [
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

  const handleIdTratamiento = (idTratamiento) => {
    setIdTratamiento(idTratamiento);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
          <MyText textValue="Búsqueda de Tratamiento:" textStyle={styles.textStyle} />
            <KeyboardAvoidingView>
              <MyInputText
                placeholder="Identificador del tratamiento"
                onChangeText={handleIdTratamiento}
                keyboardType="numeric"
                value={idTratamiento}
                styles={styles.inputStyle}
              />
              <MySingleButton
                title="Borrar"
                onPress={deleteTratamiento}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DeleteTratamiento

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
})