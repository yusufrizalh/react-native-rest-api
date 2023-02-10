import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PegawaiView from "./PegawaiView";
import PegawaiDetail from "./PegawaiDetail";
import QRScanner from "./QRScanner";
import PegawaiAdd from "./PegawaiAdd";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PegawaiView">
        <Stack.Screen
          name="PegawaiView"
          component={PegawaiView}
          options={{
            title: "Pegawai View",
            headerStyle: { backgroundColor: "#24efd2" },
          }}
        />
        <Stack.Screen
          name="PegawaiDetail"
          component={PegawaiDetail}
          options={{
            title: "Pegawai Detail",
            headerStyle: { backgroundColor: "#d3ef21" },
          }}
        />
        {/* <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            title: "Pegawai Detail",
            headerStyle: { backgroundColor: "#d3ef21" },
          }}
        /> */}
        <Stack.Screen
          name="PegawaiAdd"
          component={PegawaiAdd}
          options={{
            title: "Pegawai Add",
            headerStyle: { backgroundColor: "#773e34" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
