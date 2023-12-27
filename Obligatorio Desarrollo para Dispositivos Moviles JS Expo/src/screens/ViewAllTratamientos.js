import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../components/MyText";
import DatabaseConnection from "../database/db-connection";
const db = DatabaseConnection.getConnection();
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const ViewAllTratamientos = () => {
  const [tratamientos, setTratamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratami`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          setTratamientos(results.rows._array);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay tratamientos!!!",
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

        <MyText textValue="Identificador del tratamiento:" textStyle={styles.textTitle} />
        <MyText textValue={item.idTratamiento} textStyle={styles.textStyle} />

        <MyText textValue="Nombre del tratamiento:" textStyle={styles.textTitle} />
        <MyText textValue={item.nombre} textStyle={styles.textStyle} />

        <MyText textValue="Tiempo (horas de ejecucion):" textStyle={styles.textTitle} />
        <MyText textValue={item.tiempo} textStyle={styles.textStyle} />

        <MyText textValue="Fecha de inicio:" textStyle={styles.textTitle} />
        <MyText textValue={item.fechaInicio.toString()} textStyle={styles.textStyle} />

        <MyText textValue="Identificador de la observacion:" textStyle={styles.textTitle} />
        <MyText textValue={item.idObs} textStyle={styles.textStyle} />

        <MyText textValue="Cédula del usuario:" textStyle={styles.textTitle} />
        <MyText textValue={item.cedulaUsuario} textStyle={styles.textStyle} />

        <MyText textValue="Orden de trabajo:" textStyle={styles.textTitle} />
        <Image source={{ uri: item.ordenDeTrabajo }} style={styles.tratamientoOrden} />

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={tratamientos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => listItemView(item)}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllTratamientos;

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
   tratamientoOrden: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    marginTop: 8,
  },
});
