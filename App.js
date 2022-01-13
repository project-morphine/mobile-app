import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback, TouchableOpacity, Image
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, db } from "./firebase.js";
import * as firebase from "firebase";

// //For Expo Notifications
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

import React, { useEffect } from "react";
import Wizard from "./screens/Wizard"; //for registration pages
import useColorSCheme from './hooks/useColorScheme';
import Navigation from './navigation';

// Screens
import LoginScreen from './screens/LoginScreen';
import StepCounterScreen from './screens/StepCounter';
import Settings from './screens/SettingsScreen';
import AlertsScreen from './screens/AlertsScreen';

const Tab = createBottomTabNavigator();
const stepCounterName = "Home";
const settingsName = "Settings";
const alertName = "Alerts";

function MyTabs() {
  var ref = firebase.database().ref('fallPrediction');
  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data === false) {
      {fallDetectedAlert};
    }
  });

  return (
    <Tab.Navigator
    initialRouteName={stepCounterName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === stepCounterName) {
          iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';

        } else if (rn === settingsName) {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (rn === alertName) {
          iconName = focused ? 'ios-alert-circle' : 'ios-alert-circle-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#171E4A',
      inactiveTintColor: 'grey',
      labelStyle: { marginBottom: 5, fontSize: 10 },
      style: { padding: 10, height: 70}
    }}>
      <Tab.Screen name="Home" component={StepCounterScreen} options = {{headerRight: () => (
              <TouchableOpacity style={{paddingRight: 10}}>
                <Ionicons name="person-circle" size={35} color="grey"/>
              </TouchableOpacity>),}}/>
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{headerRight: () => (
              <TouchableOpacity style={{paddingRight: 10}}>
                <Ionicons name="person-circle" size={35} color="grey"/>
              </TouchableOpacity>),}} />
      <Tab.Screen name="Settings" component={Settings} options = {{ headerShown: false, headerRight: () => (
              <TouchableOpacity style={{paddingRight: 10}}>
                <Ionicons name="person-circle" size={35} color="grey"/>
              </TouchableOpacity>),
        }}/>
      
    </Tab.Navigator>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options = {{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options = {{
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="Setup"
        component={Setup}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  // useEffect(()=>{
  //   registerForPushNotification()
  //   .then(token=>console.log(token))
  //   .catch(err => console.log(Err))
  // },[])

  // async function registerForPushNotification() {
  //   const {status} = await Permissions.getAsync(Permissions.
  //   NOTIFICATIONS);
  //   if (status!='granted') {
  //     const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  //   }
  //   if (status != 'granted') {
  //     alert('Failure in retrieving push notifications token');
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   return;
  // }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

function Setup({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wizard navigation={navigation} />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

////ORIGINAL CODE IN TEMPLATE WITH TABS (expo init)
// export default function App() {
//   const colorScheme = useColorScheme();

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <Wizard />
//         <Navigation colorScheme={colorScheme}/>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }
