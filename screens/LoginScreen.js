import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from '@react-navigation/core';

import { auth } from "../firebase.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Signed up with', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with', user.email);
      navigation.replace("MyTabs");
    })
    .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StatusBar style="auto" />
      <Text>  </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputView}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputView}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Setup")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        > 
        <Text style={styles.forgot_button}>Don't have an account? Register here.</Text>
      </TouchableOpacity> */}
      
      <TouchableOpacity 
        onPress = {handleLogin}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress = {handleSignUp}
        style={styles.signUpBtn}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

      // <Image style={styles.image} source={require("assets/TPClogo.png")} />
      // onPress={() => navigation.navigate('Setup', { pageName = 'personal details' })}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 10,
    // justifyContent: "center",
  },
 
  image: {
    margin: 30,
    width: 300, 
    height: 70,
  },
 
  inputView: {
    backgroundColor: "#A3A3BD",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 20,
    fontSize: 12,
  },
 
  loginBtn: {
    width: "60%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#171E4A",
  },
  signUpBtn: {
    width: "60%",
    borderRadius: 5, 
    height: 50, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white", 
    borderColor: "#171E4A",
    borderWidth: 3,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  signUpText: {
    color: "#171E4A",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});