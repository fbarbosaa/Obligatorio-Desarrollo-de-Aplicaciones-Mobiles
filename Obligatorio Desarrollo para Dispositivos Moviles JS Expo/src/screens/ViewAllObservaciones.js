
import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import DatabaseConnection from "../database/db-connection";
import MyText from "../components/MyText";
import { Image } from "react-native";

const db = DatabaseConnection.getConnection();

const ViewAllObservaciones = () => {
  const [observaciones, setObservaciones] = useState([]);

  useEffect(() => {
    fetchObservaciones();
  }, []);

  const fetchObservaciones = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observacionT",
        [],
        (_, { rows }) => {
          setObservaciones(rows._array);
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  };

  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
      <MyText textValue="Identificador de la observacion:" textStyle={styles.textTitle} />
      <MyText textValue={item.idObs} textStyle={styles.textStyle} />

      <MyText textValue="Titulo de la observacion:" textStyle={styles.textTitle} />
      <MyText textValue={item.titulo} textStyle={styles.textStyle} />

      <MyText textValue="Latitud de la observacion:" textStyle={styles.textTitle} />
      <MyText textValue={item.latitud} textStyle={styles.textStyle} />

      <MyText textValue="Longitud de la observacion:" textStyle={styles.textTitle} />
      <MyText textValue={item.longitud} textStyle={styles.textStyle} />

      <MyText textValue="Foto de la observacion:" textStyle={styles.textTitle} />
      <Image source={{ uri: item.foto }} style={styles.observacionFoto} />
    </View>
    );
  }
    

return (
  <SafeAreaView style={styles.container}>
    <View>
      <View>
        <FlatList
          data={observaciones} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => listItemView(item)}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
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
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  observacionFoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    marginTop: 8,
  },
});

export default ViewAllObservaciones;
