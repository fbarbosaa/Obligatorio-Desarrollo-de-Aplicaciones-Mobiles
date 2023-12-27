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

const AddInsumo = () => {
  const [insumoId, setInsumoId] = useState("");
  const [insumoName, setInsumoName] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();

  const handleInsumoId = (insumoId) => {
    setInsumoId(insumoId);
  };

  const handleInsumoName = (insumoName) => {
    setInsumoName(insumoName);
  };

  const handleCantidad = (cantidad) => {
    setCantidad(cantidad);
  };

  const addInsumo = () => {
    console.log("### add insumo ###");

    if (validateData()) {
      console.log("### save insumo ###");
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM insumosT WHERE insumoId = ?',
          [insumoId],
          (tx, results) => {
            if (results.rows.length > 0) {
              Alert.alert("Error", "El id del insumo ya está en uso");
            } else {
              tx.executeSql(
                'INSERT INTO insumosT (insumoId, insumoName, cantidad) VALUES (?, ?, ?)',
                [insumoId, insumoName, cantidad],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      "Exito",
                      "Insumo agregado correctamente",
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
                    Alert.alert("Error", "Error al agregar el insumo");
                  }
                }
              );
            }
          }
        );
      });
    }
  };

  const validateData = () => {
    if (insumoId === "" || !insumoId.trim()) {
      Alert.alert("Error", "El identificador del insumo es obligatorio");
      return false;
    }

    if (insumoName === "" || !insumoName.trim()) {
      Alert.alert("Error", "El nombre del insumo es obligatorio");
      return false;
    }

    if (cantidad === "" || !cantidad.trim()) {
      Alert.alert("Error", "La cantidad es obligatoria");
      return false;
    }

    return true;
  };

  const clearData = () => {
    setInsumoId("");
    setInsumoName("");
    setCantidad("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>

              <MyInputText
                styles={styles.inputInsumo}
                placeholder="Identificador del insumo"
                keyboardType="numeric"
                onChangeText={handleInsumoId}
                value={insumoId}
              />

              <MyInputText
                styles={styles.inputInsumo}
                placeholder="Nombre del insumo"
                onChangeText={handleInsumoName}
                value={insumoName}
              />

              <MyInputText
                styles={styles.inputCantidad}
                placeholder="Cantidad (litros utilizados)"
                keyboardType="numeric"
                onChangeText={handleCantidad}
                value={cantidad}
              />

              <MySingleButton
                title="Agregar Insumo"
                btnColor="green"
                onPress={addInsumo}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  inputInsumo: {},
  inputCantidad: {},
});

export default AddInsumo;
