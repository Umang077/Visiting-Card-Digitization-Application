import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import CameraScreen from "./screens/CameraScreen";
import ThankyouScreen from "./screens/ThankyouScreen";
import QrScreen from "./screens/QrScreen";
import ErrorScreen from "./screens/ErrorScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Thankyou" component={ThankyouScreen} />
        <Stack.Screen name="error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// {
//   "cli": {
//     "version": ">= 7.8.5"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {}
//   },
//   "submit": {
//     "production": {}
//   }
// }
