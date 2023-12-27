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

const EditInsumo = () => {
  const [insumoIdSearch, setInsumoIdSearch] = useState("");
  const [insumoName, setInsumoName] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();

  const handleInsumoIdSearch = (id) => {
    setInsumoIdSearch(id);
  };

  const handleInsumoName = (name) => {
    setInsumoName(name);
  };

  const handleCantidad = (value) => {
    setCantidad(value);
  };

  const validateData = () => {
    if (!insumoName || !insumoName.trim()) {
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }

    if (!cantidad || isNaN(Number(cantidad))) {
      Alert.alert("Error", "La cantidad debe ser un número válido");
      return false;
    }

    return true;
  };

  const clearInsumoIdSearch = () => {
    setInsumoIdSearch("");
  };

  const clearData = () => {
    setInsumoName("");
    setCantidad("");
  };

  const editInsumo = () => {
    if (validateData()) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE insumosT SET insumoName=?, cantidad=? WHERE insumoId=?",
          [insumoName, cantidad, insumoIdSearch],
          (_, results) => {
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert("Éxito", "Insumo actualizado correctamente", 
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
                {
                  cancelable: false,
                },
              );
            } else {
              Alert.alert("Error", "Error al actualizar el insumo");
            }
          }
        );
      });
    }
  };

  const searchInsumo = () => {
    if (!insumoIdSearch.trim()) {
      Alert.alert("Error", "El id del insumo es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumosT WHERE insumoId = ?",
        [insumoIdSearch],
        (_, results) => {
          if (results.rows.length > 0) {
            const insumo = results.rows.item(0);
            setInsumoName(insumo.insumoName);
            setCantidad(insumo.cantidad.toString());
          } else {
            Alert.alert("Error", "Insumo no encontrado");
            clearInsumoIdSearch();
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
              <MyText textValue="Buscar insumo:" textStyle={styles.textStyle} />

              <MyInputText
                placeholder="Ingrese el identificador del insumo"
                onChangeText={handleInsumoIdSearch}
                keyboardType="numeric"
                styles={styles.input}
                value={insumoIdSearch}
              />
              <MySingleButton
                title="Buscar"
                onPress={searchInsumo}
                btnColor="#4922a3"
              />

              <MyInputText
                placeholder="Nombre del insumo"
                value={insumoName}
                onChangeText={handleInsumoName}
              />

              <MyInputText
                placeholder="Cantidad"
                value={cantidad}
                onChangeText={handleCantidad}
                keyboardType="numeric"
              />

              <MySingleButton title="Editar"
                onPress={editInsumo}
                btnColor="blue" />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditInsumo;

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
