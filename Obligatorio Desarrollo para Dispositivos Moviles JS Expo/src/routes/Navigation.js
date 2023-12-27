import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

//Inicio
import HomeScreen from "../screens/HomeScreen";

//Usuarios
import AddUser from "../screens/AddUser";
import DeleteUser from "../screens/DeleteUser";
import ViewAllUsers from "../screens/ViewAllUsers";
import EditUser from "../screens/EditUser";

//Insumos
import AddInsumo from "../screens/AddInsumo";
import DeleteInsumo from "../screens/DeleteInsumo";
import ViewAllInsumos from "../screens/ViewAllInsumos";
import EditInsumo from "../screens/EditInsumo";

//Zonas
import AddZona from "../screens/AddZona";
import DeleteZona from "../screens/DeleteZona";
import ViewAllZonas from "../screens/ViewAllZonas";
import EditZona from "../screens/EditZona";

//Observaciones
import AddObservacion from "../screens/AddObservacion";
import DeleteObservacion from "../screens/DeleteObservacion";
import ViewAllObservaciones from "../screens/ViewAllObservaciones";
import EditObservacion from "../screens/EditObservacion";

//Tratamientos
import AddTratamiento from "../screens/AddTratamiento";
import DeleteTratamiento from "../screens/DeleteTratamiento";
import ViewAllTratamientos from "../screens/ViewAllTratamientos";
import EditTratamiento from "../screens/EditTratamiento";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "CTC Fruit Farm - Principal",
            headerStyle: {
              backgroundColor: "#0356fc"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="RegisterUser"
          component={AddUser}
          options={{
            title: "Agregar Usuario",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title: "Borrar Usuario",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUsers}
          options={{
            title: "Ver todos los Usuarios",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={{
            title: "Actualizar Usuario",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddInsumo"
          component={AddInsumo}
          options={{
            title: "Agregar Insumo",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="DeleteInsumo"
          component={DeleteInsumo}
          options={{
            title: "Borrar Insumos",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllInsumos"
          component={ViewAllInsumos}
          options={{
            title: "Ver todos los Insumos",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditInsumo"
          component={EditInsumo}
          options={{
            title: "Actualizar Insumos",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddZona"
          component={AddZona}
          options={{
            title: "Agregar Zona",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />


        <Stack.Screen
          name="DeleteZona"
          component={DeleteZona}
          options={{
            title: "Borrar Zona",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllZonas"
          component={ViewAllZonas}
          options={{
            title: "Ver todas las Zonas",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditZona"
          component={EditZona}
          options={{
            title: "Editar Zonas",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddObservacion"
          component={AddObservacion}
          options={{
            title: "Agregar Observacion",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="DeleteObservacion"
          component={DeleteObservacion}
          options={{
            title: "Borrar Observacion",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllObservaciones"
          component={ViewAllObservaciones}
          options={{
            title: "Ver todas las Observaciones",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditObservacion"
          component={EditObservacion}
          options={{
            title: "Editar Observaciones",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddTratamiento"
          component={AddTratamiento}
          options={{
            title: "Agregar Tratamiento",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="DeleteTratamiento"
          component={DeleteTratamiento}
          options={{
            title: "Borrar Tratamiento",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllTratamientos"
          component={ViewAllTratamientos}
          options={{
            title: "Ver todos los Tratamientos",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditTratamiento"
          component={EditTratamiento}
          options={{
            title: "Actualizar Tratamientos",
            headerStyle: {
              backgroundColor: "#0356fc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
