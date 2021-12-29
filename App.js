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

import React from "react";
import Wizard from "./screens/Wizard";
import useColorSCheme from './hooks/useColorScheme';
import Navigation from './navigation';

// Screens
import LoginScreen from './screens/LoginScreen';
import StepCounterScreen from './screens/StepCounter';
import Settings from './screens/SettingsScreen';

//Screen names
// const loginName = "Login";
// const stepCounterName = "Steps Count";
// const settingsName = "Settings";

// const Tab = createBottomTabNavigator();

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 230, height: 50, margin: 8,}}
//       source={require('./assets/images/TPC-Website.svg')}
//     />
//   );
// }

// function MainContainer() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={loginName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === loginName) {
//               iconName = focused ? 'log-in' : 'log-in-outline';

//             } else if (rn === stepCounterName) {
//               iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';

//             } else if (rn === settingsName) {
//               iconName = focused ? 'settings' : 'settings-outline';
//             }
//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#171E4A',
//           inactiveTintColor: 'grey',
//           labelStyle: { marginBottom: 5, fontSize: 10 },
//           style: { padding: 10, height: 70}
//         }}>

//         <Tab.Screen
//             options={{
//             headerTitle: (props) => <LogoTitle {...props} />,
//             headerRight: () => (
//               <TouchableOpacity style={{paddingRight: 10}}>
//                 <Ionicons name="person-circle" size={35} color="grey"/>
//               </TouchableOpacity>
//             ),
//           }}
//          name={loginName} component={LoginScreen} />
//         <Tab.Screen 
//           options={{
//             headerTitle: (props) => <LogoTitle {...props} />,
//             headerRight: () => (
//               <TouchableOpacity style={{paddingRight: 10}}>
//                 <Ionicons name="person-circle" size={35} color="grey"/>
//               </TouchableOpacity>
//             ),
//           }}
//           name={stepCounterName} component={StepCounterScreen} />
//         <Tab.Screen name={settingsName} options={{headerShown: false}} component={SettingsScreen} />

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MainContainer;

const Tab = createBottomTabNavigator();
const stepCounterName = "Home";
const settingsName = "Settings";

function MyTabs() {
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
      <Tab.Screen name="Home" component={StepCounterScreen} />
      <Tab.Screen name="Settings" component={Settings} options = {{ headerShown: false
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
        name="Setup"
        component={Setup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options = {{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
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
