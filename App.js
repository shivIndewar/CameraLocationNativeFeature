import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useState } from "react";
import AppLoading from "expo-app-loading";

const stack = createNativeStackNavigator();

export default function App() {

 const [dbInitialized, setDbInitialized] =  useState(false);

  // useEffect(()=>{
  //    init();
  // },[]);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor: Colors.primary500,
          },
          headerTintColor : Colors.gray700,
          contentStyle: {backgroundColor : Colors.gray700}
        }}>
          <stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title:'Your favourite places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <stack.Screen name="AddPlace" component={AddPlace} options={{
            title:'Add a new place'
          }}/>
          <stack.Screen name="Map" component={Map} /> 
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
