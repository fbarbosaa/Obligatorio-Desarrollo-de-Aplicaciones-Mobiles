import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import DatabaseConnection from "../database/db-connection";
import { ImageBackground } from "react-native";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {

  //Tabla Usuarios
  const createDb = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS persona (id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(60),cedula NUMERIC(8), apellido VARCHAR(200))',
      []
    );
  };

  //Tabla Insumos
  const createInsumosTable = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS insumosT (id INTEGER PRIMARY KEY AUTOINCREMENT, insumoId INTEGER, insumoName VARCHAR(60), cantidad INTEGER)',
      []
    );
  };

  //Tabla Zonas
  const createZonasTable = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS zonasT (id INTEGER PRIMARY KEY AUTOINCREMENT, idZona, lugar VARCHAR(60), departamento VARCHAR(60), cantidadTrabajadores INTEGER, latitud VARCHAR(60), longitud VARCHAR(60))',
      []
    );
  };

  //Tabla Observaciones
  const createObservacionesTable = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS observacionT (id INTEGER PRIMARY KEY AUTOINCREMENT,idObs INTEGER, titulo VARCHAR(60), latitud VARCHAR(60), longitud VARCHAR(60), foto VARCHAR(200))',
      []
    );
  };


  //Tabla Tratamientos
  const createTratamientosTable = (tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tratami (id INTEGER PRIMARY KEY AUTOINCREMENT, idTratamiento INTEGER, nombre VARCHAR(60), tiempo INTEGER, fechaInicio VARCHAR(60), fechaFin VARCHAR(60), ordenDeTrabajo VARCHAR(200), cedulaUsuario INTEGER, idZona INTEGER, insumoId INTEGER, idObs INTEGER)',
      []
    );
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='persona'",
        [],
        (_, results) => {
          if (results.rows.length == 0) {
            dropDb(txn);
            createDb(txn);
          } else {
            console.log("Table 'users' already exists");
          }
        }
      );


      txn.executeSql
        ("SELECT name FROM sqlite_master WHERE type='table' AND name='tratami'",
          [],
          (_, results) => {
            if (results.rows.length == 0) {
              createTratamientosTable(txn);
            } else {
              console.log("Table 'tratamientosTable' already exists");
            }
          }
        );

      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='insumosT'",
        [],
        (_, results) => {
          if (results.rows.length == 0) {
            createInsumosTable(txn);
          } else {
            console.log("Table 'insumosT' already exists");
          }
        }
      );

      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='zonasT'",
        [],
        (_, results) => {
          if (results.rows.length == 0) {
            createZonasTable(txn);
          } else {
            console.log("Table 'zonasT' already exists");
          }
        }
      );

      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='observacionT'",
        [],
        (_, results) => {
          if (results.rows.length == 0) {
            createObservacionesTable(txn);
          } else {
            console.log("Table 'observacionT' already exists");
          }
        }
      );
    });
  }, []);

  const [showUsuariosOptions, setShowUsuariosOptions] = useState(false);
  const [showInsumosOptions, setShowInsumosOptions] = useState(false);
  const [showZonasOptions, setShowZonasOptions] = useState(false);
  const [showObservacionesOptions, setShowObservaciones] = useState(false);
  const [showTratamientosOptions, setShowTratamientos] = useState(false);

  const toggleUsuariosOptions = () => {
    setShowUsuariosOptions(!showUsuariosOptions);
  };

  const toggleInsumosOptions = () => {
    setShowInsumosOptions(!showInsumosOptions);
  };

  const toggleZonasOptions = () => {
    setShowZonasOptions(!showZonasOptions);
  };

  const toggleObservacionesOptions = () => {
    setShowObservaciones(!showObservacionesOptions);
  };

  const toggleTratamientosOptions = () => {
    setShowTratamientos(!showTratamientosOptions);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo3.jpg")}
      style={styles.viewContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalContainer}>
            <ScrollView>
              <View>
                <MyButton
                  title={
                    showUsuariosOptions
                      ? "Ocultar opciones de Usuarios"
                      : "Mostrar opciones de Usuarios"
                  }
                  btnColor="#22802b"
                  btnIcon="user"
                  onPress={toggleUsuariosOptions}
                />

                {showUsuariosOptions && (
                  <View>
                    <MyButton
                      title="Agregar Usuario"
                      btnColor="#464746"
                      btnIcon="user-plus"
                      onPress={() => navigation.navigate("RegisterUser")}
                    />

                    <MyButton
                      title="Borrar Usuario"
                      btnColor="#464746"
                      btnIcon="user-times"
                      onPress={() => navigation.navigate("DeleteUser")}
                    />

                    <MyButton
                      title="Ver todos los Usuarios"
                      btnColor="#464746"
                      btnIcon="users"
                      onPress={() => navigation.navigate("ViewAllUsers")}
                    />

                    <MyButton
                      title="Actualizar Usuario"
                      btnColor="#464746"
                      btnIcon="user-circle"
                      onPress={() => navigation.navigate("EditUser")}
                    />
                  </View>
                )}

                <MyButton
                  title={
                    showInsumosOptions
                      ? "Ocultar opciones de Insumos"
                      : "Mostrar opciones de Insumos"
                  }
                  btnColor="#cc7231"
                  btnIcon="archive"
                  onPress={toggleInsumosOptions}
                />

                {showInsumosOptions && (
                  <View>
                    <MyButton
                      title="Agregar Insumo"
                      btnColor="#464746"
                      btnIcon="plus"
                      onPress={() => navigation.navigate("AddInsumo")}
                    />

                    <MyButton
                      title="Borrar Insumo"
                      btnColor="#464746"
                      btnIcon="trash"
                      onPress={() => navigation.navigate("DeleteInsumo")}
                    />

                    <MyButton
                      title="Ver todos los insumos"
                      btnColor="#464746"
                      btnIcon="list"
                      onPress={() => navigation.navigate("ViewAllInsumos")}
                    />

                    <MyButton
                      title="Actualizar Insumo"
                      btnColor="#464746"
                      btnIcon="pencil"
                      onPress={() => navigation.navigate("EditInsumo")}
                    />
                  </View>
                )}

                <MyButton
                  title={
                    showZonasOptions
                      ? "Ocultar opciones de Zonas"
                      : "Mostrar opciones de Zonas"
                  }
                  btnColor="#3140cc"
                  btnIcon="map"
                  onPress={toggleZonasOptions}
                />

                {showZonasOptions && (
                  <View>
                    <MyButton
                      title="Agregar Zona"
                      btnColor="#464746"
                      btnIcon="map-marker"
                      onPress={() => navigation.navigate("AddZona")}
                    />

                    <MyButton
                      title="Borrar Zona"
                      btnColor="#464746"
                      btnIcon="ban"
                      onPress={() => navigation.navigate("DeleteZona")}
                    />

                    <MyButton
                      title="Ver todas las Zonas"
                      btnColor="#464746"
                      btnIcon="list-alt"
                      onPress={() => navigation.navigate("ViewAllZonas")}
                    />

                    <MyButton
                      title="Editar Zona"
                      btnColor="#464746"
                      btnIcon="pencil-square-o"
                      onPress={() => navigation.navigate("EditZona")}
                    />
                  </View>
                )}

                <MyButton
                  title={
                    showObservacionesOptions
                      ? "Ocultar opciones de Observaciones"
                      : "Mostrar opciones de Observaciones"
                  }
                  btnColor="#6b34eb"
                  btnIcon="bug"
                  onPress={toggleObservacionesOptions}
                />
                {showObservacionesOptions && (
                  <View>
                    <MyButton
                      title="Agregar observaciones"
                      btnColor="#464746"
                      btnIcon="clone"
                      onPress={() => navigation.navigate("AddObservacion")}
                    />

                    <MyButton
                      title="Borrar Observacion"
                      btnColor="#464746"
                      btnIcon="times"
                      onPress={() => navigation.navigate("DeleteObservacion")}
                    />

                    <MyButton
                      title="Ver todas las Observaciones"
                      btnColor="#464746"
                      btnIcon="list-ul"
                      onPress={() => navigation.navigate("ViewAllObservaciones")}
                    />

                    <MyButton
                      title="Editar Observacion"
                      btnColor="#464746"
                      btnIcon="pencil"
                      onPress={() => navigation.navigate("EditObservacion")}
                    />

                  </View>
                )}

                <MyButton
                  title={
                    showTratamientosOptions
                      ? "Ocultar opciones de Tratamientos"
                      : "Mostrar opciones de Tratamientos"
                  }
                  btnColor="#a8a832"
                  btnIcon="plus"
                  onPress={toggleTratamientosOptions}
                />
                {showTratamientosOptions && (
                  <View>
                    <MyButton
                      title="Agregar Tratamiento"
                      btnColor="#464746"
                      btnIcon="sticky-note-o"
                      onPress={() => navigation.navigate("AddTratamiento")}
                    />

                    <MyButton
                      title="Borrar Tratamiento"
                      btnColor="#464746"
                      btnIcon="minus-circle"
                      onPress={() => navigation.navigate("DeleteTratamiento")}
                    />

                    <MyButton
                      title="Ver todos los Tratamientos"
                      btnColor="#464746"
                      btnIcon="eye"
                      onPress={() => navigation.navigate("ViewAllTratamientos")}
                    />

                    <MyButton
                      title="Editar Tratamiento"
                      btnColor="#464746"
                      btnIcon="pencil"
                      onPress={() => navigation.navigate("EditTratamiento")}
                    />

                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
  generalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default HomeScreen;
