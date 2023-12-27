import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../components/MyText";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";

const ViewAllZonas = () => {
  const [zonas, setZonas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM zonasT`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setZonas(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay zonas!!!",
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

        <MyText textValue="Identificador:" textStyle={styles.textTitle} />
        <MyText textValue={item.idZona} textStyle={styles.textStyle} />

        <MyText textValue="Lugar:" textStyle={styles.textTitle} />
        <MyText textValue={item.lugar} textStyle={styles.textStyle} />

        <MyText textValue="Departamento:" textStyle={styles.textTitle} />
        <MyText textValue={item.departamento} textStyle={styles.textStyle} />

        <MyText textValue="Cantidad de Trabajadores:" textStyle={styles.textTitle} />
        <MyText textValue={item.cantidadTrabajadores.toString()} textStyle={styles.textStyle} />

        <MyText textValue="Latitud:" textStyle={styles.textTitle} />
        <MyText textValue={item.latitud} textStyle={styles.textStyle} />

        <MyText textValue="Longitud:" textStyle={styles.textTitle} />
        <MyText textValue={item.longitud} textStyle={styles.textStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={zonas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllZonas;

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
