import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
    Image,
    Text,
} from "react-native";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DatabaseConnection from "../database/db-connection";

const db = DatabaseConnection.getConnection();

const EditUser = () => {
    const [idTratamientoSearch, setIdTratamientoSearch] = useState("");
    const [nombre, setNombre] = useState("");
    const [tiempo, setTiempo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [ordenDeTrabajo, setOrdenDeTrabajo] = useState("");
    const [cedulaUsuario, setCedulaUsuario] = useState("");
    const [idZona, setIdZona] = useState("");
    const [insumoId, setInsumoId] = useState("");
    const [idObs, setIdObs] = useState("");
    const navigation = useNavigation();

    const handleIdTratamientoSearch = (cedula) => {
        setIdTratamientoSearch(cedula);
    };

    const handleNombre = (nombre) => {
        setNombre(nombre);
    };

    const handleTiempo = (tiempo) => {
        setTiempo(tiempo);
    };

    const handleFechaInicio = (fechaInicio) => {
        setFechaInicio(fechaInicio);
    };

    const handleFechaFin = (fechaFin) => {
        setFechaFin(fechaFin);
    };

    const handleCedulaUsuario = (cedulaUsuario) => {
        setCedulaUsuario(cedulaUsuario);
    };

    const handleOrdenDeTrabajo = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Acceso denegado",
                "Se requiere acceso a la galería de imágenes para seleccionar una foto"
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setOrdenDeTrabajo(result.assets[0].uri);
        }
    };

    const validateData = () => {
        if (!idTratamientoSearch && !idTratamientoSearch.length && idTratamientoSearch === "" && !idTratamientoSearch.trim()) {
            Alert.alert("Error", "El id del tratamiento es obligatoria");
            return false;
        }

        if (nombre === "" && !nombre.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return false;
        }

        if (tiempo === "" && !tiempo.trim()) {
            Alert.alert("Error", "El tiempo es obligatorio");
            return false;
        }

        if (fechaInicio === "" && !fechaInicio.trim()) {
            Alert.alert("Error", "La fecha de inicio es obligatoria");
            return false;
        }

        if (fechaFin === "" && !fechaFin.trim()) {
            Alert.alert("Error", "La fecha de fin es obligatoria");
            return false;
        }

        if (ordenDeTrabajo === "" && !ordenDeTrabajo.trim()) {
            Alert.alert("Error", "La orden de trabajo es obligatoria");
            return false;
        }

        if (cedulaUsuario === "" && !cedulaUsuario.trim()) {
            Alert.alert("Error", "La cédula de usuario es obligatoria");
            return false;
        }

        if (idZona === "" && !idZona.trim()) {
            Alert.alert("Error", "El identificador de la zona es obligatorio");
            return false;
        }

        if (insumoId === "" && !insumoId.trim()) {
            Alert.alert("Error", "El identificador del insumo es obligatorio");
            return false;
        }

        if (idObs === "" && !idObs.trim()) {
            Alert.alert("Error", "El identificador de la observación es obligatorio");
            return false;
        }
        return true;
    };

    const clearIdTratamientoSearch = () => {
        setIdTratamientoSearch("");
    };

    const clearData = () => {
        setNombre("");
        setTiempo("");
        setFechaInicio("");
        setFechaFin("");
        setOrdenDeTrabajo("");
        setCedulaUsuario("");
        setIdZona("");
        setInsumoId("");
        setIdObs("");
    };

    const editTratamiento = () => {
        if (validateData()) {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM persona WHERE cedula = ?",
                    [cedulaUsuario],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            tx.executeSql(
                                "SELECT * FROM zonasT WHERE idZona = ?",
                                [idZona],
                                (tx, results) => {
                                    if (results.rows.length > 0) {
                                        tx.executeSql(
                                            "SELECT * FROM insumosT WHERE insumoId = ?",
                                            [insumoId],
                                            (tx, results) => {
                                                if (results.rows.length > 0) {
                                                    tx.executeSql(
                                                        "SELECT * FROM observacionT WHERE idObs = ?",
                                                        [idObs],
                                                        (tx, results) => {
                                                            if (results.rows.length > 0) {
                                                                tx.executeSql(
                                                                    "UPDATE tratami SET nombre=?, tiempo=?, fechaInicio=?, fechaFin=?, ordenDeTrabajo=?, cedulaUsuario=?, idZona=?, insumoId=?, idObs=? WHERE idTratamiento=?",
                                                                    [nombre, tiempo, fechaInicio, fechaFin, ordenDeTrabajo, cedulaUsuario, idZona, insumoId, idObs, idTratamientoSearch],
                                                                    (tx, results) => {
                                                                        if (results.rowsAffected > 0) {
                                                                            clearData();
                                                                            Alert.alert(
                                                                                "Éxito",
                                                                                "Tratamiento actualizado correctamente",
                                                                                [
                                                                                    {
                                                                                        text: "Ok",
                                                                                        onPress: () =>
                                                                                            navigation.navigate("HomeScreen"),
                                                                                    },
                                                                                ],
                                                                                {
                                                                                    cancelable: false,
                                                                                }
                                                                            );
                                                                        } else {
                                                                            Alert.alert(
                                                                                "Error",
                                                                                "Error al actualizar el tratamiento"
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            } else {
                                                                Alert.alert(
                                                                    "Error",
                                                                    "El identificador de la observación no existe"
                                                                );
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    Alert.alert("Error", "El identificador del insumo no existe");
                                                }
                                            }
                                        );
                                    } else {
                                        Alert.alert("Error", "El identificador de la zona no existe");
                                    }
                                }
                            );
                        } else {
                            Alert.alert("Error", "La cédula de usuario no existe");
                        }
                    }
                );
            });
        }
    };

    const searchUser = () => {
        if (!idTratamientoSearch.trim() && idTratamientoSearch === "") {
            Alert.alert("Error", "El identificador del tratamiento es requerido");
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM tratami WHERE idTratamiento = ?",
                [idTratamientoSearch],
                (_, results) => {
                    if (results.rows.length > 0) {
                        const tratamiento = results.rows.item(0);
                        setNombre(tratamiento.nombre);
                        setTiempo(tratamiento.tiempo.toString());
                        setFechaInicio(tratamiento.fechaInicio);
                        setFechaFin(tratamiento.fechaFin);
                        setOrdenDeTrabajo(tratamiento.ordenDeTrabajo);
                        setCedulaUsuario(tratamiento.cedulaUsuario.toString());
                        setIdZona(tratamiento.idZona.toString());
                        setInsumoId(tratamiento.insumoId.toString());
                        setIdObs(tratamiento.idObs.toString());
                    } else {
                        Alert.alert("Error", "Tratamiento no encontrado");
                        clearIdTratamientoSearch();
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
                            <MyText textValue="Buscar Tratamiento:" textStyle={styles.textStyle} />
                            <MyInputText
                                placeholder="Ingrese el identificador del tratamiento"
                                onChangeText={handleIdTratamientoSearch}
                                styles={styles.input}
                                value={idTratamientoSearch}
                            />
                            <MySingleButton
                                title="Buscar"
                                onPress={searchUser}
                                btnColor="#4922a3"
                            />

                            <MyInputText
                                placeholder="Nombre de tratamiento"
                                value={nombre}
                                onChangeText={handleNombre}
                            />


                            <MyInputText
                                placeholder="Tiempo del tratamiento"
                                value={tiempo}
                                onChangeText={handleTiempo}
                            />
                            <MyInputText
                                placeholder="Fecha de inicio"
                                value={fechaInicio}
                                onChangeText={handleFechaInicio}
                            />
                            <MyInputText
                                placeholder="Fecha final"
                                value={fechaFin}
                                onChangeText={handleFechaFin}
                            />
                            <MyInputText
                                placeholder="Cédula del usuario"
                                value={cedulaUsuario}
                                onChangeText={handleCedulaUsuario}
                            />
                            <MyInputText
                                styles={styles.inputIdZona}
                                placeholder="Id de la zona"
                                onChangeText={(idZona) => setIdZona(idZona)}
                                value={idZona}
                                keyboardType="numeric"
                            />

                            <MyInputText
                                styles={styles.inputInsumoId}
                                placeholder="Id del insumo"
                                onChangeText={(insumoId) => setInsumoId(insumoId)}
                                value={insumoId}
                                keyboardType="numeric"
                            />

                            <MyInputText
                                styles={styles.inputIdObs}
                                placeholder="Id de la observación"
                                onChangeText={(idObs) => setIdObs(idObs)}
                                value={idObs}
                                keyboardType="numeric"
                            />

                            <TouchableOpacity onPress={handleOrdenDeTrabajo} style={styles.photoButton}>
                                {ordenDeTrabajo ? (
                                    <Image source={{ uri: ordenDeTrabajo }} style={styles.photoPreview} />
                                ) : (
                                    <Text style={styles.photoButtonText}>Seleccionar Foto</Text>
                                )}
                            </TouchableOpacity>

                            <MySingleButton
                                title="Editar"
                                onPress={editTratamiento}
                                btnColor="blue"
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditUser;

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
    textStyle: {
        padding: 10,
        marginLeft: 20,
        color: "white",
        fontSize: 15,
    },
    input: {
        padding: 15,
    },
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
    photoButton: {
        backgroundColor: "#518a72",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 218,
        marginLeft: 31,
        marginRight: 35,
        marginVertical: 10,
        borderRadius: 5,
    },
    photoButtonText: {
        fontSize: 16,
        color: "white",
    },
    photoPreview: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});
