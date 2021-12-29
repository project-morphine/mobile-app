import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { auth } from "../firebase.js";


//Can be made variable for user to edit
const GoalSteps = 10000;
const user = auth.currentUser;

export default function StepCounterScreen() {
  const [Steps, setSteps] = useState(0);

  function IncreaseCount() {
    setSteps(Steps + 100);
    // console.log({steps})
  }

  function DecreaseCount() {
    setSteps(Steps - 100);
  }
  //Percentage to goal
  const StepProgress = (Steps / GoalSteps) * 100;

  //Returned in App
  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>Welcome, {auth.currentUser?.email}</Text>
      <Text style={styles.title}>Steps Count</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

    <AnimatedCircularProgress
        size={200}
        width={18}
        fill={StepProgress}
        tintColor='#2ecc73'
        padding= {10}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#c1f1d6" />
      <Text style={styles.title}>{Steps}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={IncreaseCount}>
          <Text style={styles.buttonText}>
            Increase
          </Text>
        </TouchableOpacity>
        <Text>    </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={DecreaseCount}>
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// <TouchableOpacity onPress={DecreaseCount}>
//   <Text>Decrease</Text>
// </TouchableOpacity>;

const styles = StyleSheet.create({
    buttonContainer: {
    backgroundColor: '#171E4A',
    width: 150, 
    height: 50, 
    borderRadius: 6,
    alignItems: "center", 
    justifyContent: "center",
    // // justifyContent: "center", 
    flexDirection: "row",
  }, 

  buttonText: {
    // margin: 10, 
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: "white", 
    fontWeight: 'bold',
  },
  container: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});