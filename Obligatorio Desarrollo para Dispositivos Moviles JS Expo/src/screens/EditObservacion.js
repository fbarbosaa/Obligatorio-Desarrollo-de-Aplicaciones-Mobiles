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
import ModalSelector from "react-native-modal-selector";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DatabaseConnection from "../database/db-connection";

const db = DatabaseConnection.getConnection();

const EditObservacion = () => {
    const [idObsSearch, setIdObsSearch] = useState("");
    const [titulo, setTitulo] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [foto, setFoto] = useState(null);
    const navigation = useNavigation();

    const handleIdObsSearch = (id) => {
        setIdObsSearch(id);
    };

    const handleTitulo = (titulo) => {
        setTitulo(titulo);
    };

    const handleLatitud = (latitud) => {
        setLatitud(latitud);
    };

    const handleLongitud = (longitud) => {
        setLongitud(longitud);
    };

    const handleFoto = async () => {
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
            setFoto(result.assets[0].uri);
        }
    };

    const validateData = () => {
        if (titulo === "" && !titulo.trim()) {
            Alert.alert("Error", "Ingrese el título de la observación");
            return false;
        }

        if (latitud === "" && !latitud.trim()) {
            Alert.alert("Error", "La latitud es obligatoria");
            return false;
        }

        if (longitud === "" && !longitud.trim()) {
            Alert.alert("Error", "La longitud es obligatoria");
            return false;
        }

        if (foto === null) {
            Alert.alert("Error", "Seleccione una foto de la galería");
            return false;
        }
        return true;
    };

    const clearObservacionIdSearch = () => {
        setIdObsSearch("");
    };

    const clearData = () => {
        setTitulo("");
        setLatitud("");
        setLongitud("");
        setFoto(null);
    };

    const editObservacion = () => {
        if (validateData()) {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE observacionT SET titulo=?, latitud=?, longitud=?, foto=? WHERE idObs=?",
                    [titulo, latitud, longitud, foto, idObsSearch],
                    (_, results) => {
                        if (results.rowsAffected > 0) {
                            clearData();
                            Alert.alert("Éxito", "Observacion actualizado correctamente", 
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
                            Alert.alert("Error", "Error al actualizar la observacion");
                        }
                    }
                );
            });
        }
    };

    const searchObservacion = () => {
        if (!idObsSearch.trim()) {
            Alert.alert("Error", "El identificador de la observacion es requerido");
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM observacionT WHERE idObs = ?",
                [idObsSearch],
                (_, results) => {
                    if (results.rows.length > 0) {
                        const observacion = results.rows.item(0);
                        setTitulo(observacion.titulo);
                        setLatitud(observacion.latitud);
                        setLongitud(observacion.longitud);
                        setFoto(observacion.foto);
                    } else {
                        Alert.alert("Error", "Observacion no encontrado");
                        clearObservacionIdSearch();
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
                            <MyText textValue="Buscar observacion" textStyle={styles.textStyle} />
                            <MyInputText
                                placeholder="Ingrese el identificador del observacion"
                                onChangeText={handleIdObsSearch}
                                keyboardType="numeric"
                                styles={styles.input}
                                value={idObsSearch}
                            />
                            <MySingleButton
                                title="Buscar"
                                onPress={searchObservacion}
                                btnColor="#4922a3"
                            />

                            <ModalSelector
                                data={[
                                    { key: 0, label: "Plaga detectada" },
                                    { key: 1, label: "Planta en mal estado" },
                                    { key: 2, label: "Falta de riego" },
                                ]}
                                initValue="Seleccionar Titulo"
                                onChange={(option) => handleTitulo(option.label)}
                                style={styles.modalSelector}
                                selectTextStyle={styles.modalSelectorText}
                                optionTextStyle={styles.modalSelectorText}
                                cancelStyle={styles.modalSelectorCancel}
                            >
                                <MyInputText
                                    styles={styles.inputTitulo}
                                    placeholder="Titulo"
                                    value={titulo}
                                    editable={false}
                                />
                            </ModalSelector>
                            <MyInputText
                                placeholder="Latitud de la observacion"
                                value={latitud}
                                onChangeText={handleLatitud}
                                keyboardType="numeric"
                            />

                            <MyInputText
                                placeholder="Longitud de la observacion"
                                value={longitud}
                                onChangeText={handleLongitud}
                            />
                            <TouchableOpacity onPress={handleFoto} style={styles.photoButton}>
                                {foto ? (
                                    <Image source={{ uri: foto }} style={styles.photoPreview} />
                                ) : (
                                    <Text style={styles.photoButtonText}>Seleccionar Foto</Text>
                                )}

                            </TouchableOpacity>

                            <MySingleButton title="Editar"
                                onPress={editObservacion}
                                btnColor="blue" />

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditObservacion;

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
        fontSize: 15
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
    modalSelectorText: {
        color: "black",
    },
    modalSelectorCancel: {
        backgroundColor: "red",
        color: "black"
    }
});
