import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../components/MyText";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const ViewAllInsumos = () => {
  const [insumos, setInsumos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM insumosT`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setInsumos(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay insumos!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeScreen"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText textValue="Identificador del Insumo:" textStyle={styles.textTitle} />
        <MyText textValue={item.insumoId} textStyle={styles.textStyle} />

        <MyText textValue="Nombre del Insumo:" textStyle={styles.textTitle} />
        <MyText textValue={item.insumoName} textStyle={styles.textStyle} />

        <MyText textValue="Cantidad (litros utilizados):" textStyle={styles.textTitle} />
        <MyText textValue={item.cantidad.toString()} textStyle={styles.textStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={insumos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllInsumos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
  },
  textStyle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  textTitle: {
    padding: 5,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  listItemView: {
    backgroundColor: "white",
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
});
