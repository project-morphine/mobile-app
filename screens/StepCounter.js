import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Path,
  Button,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

//Can be made variable for user to edit
const GoalSteps = 10000;

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
      <Text style={styles.container}>Today's Progress</Text>

      <Text style={styles.title}>Steps Count</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <CircularProgress
        radius={90}
        value={StepProgress}
        textColor='#222'
        fontSize={20}
        inActiveStrokeColor='#2ecc73'
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={6}
        duration={1000}
        // onAnimationComplete ={() => setValue(50)}
      />
  
      <Text style={styles.title}>{Steps}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={IncreaseCount} title="Increase"></Button>
        <Text> </Text>
        <Button onPress={DecreaseCount} title="Decrease"></Button>
      </View>
    </View>
  );
}

// <TouchableOpacity onPress={DecreaseCount}>
//   <Text>Decrease</Text>
// </TouchableOpacity>;

const styles = StyleSheet.create({
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
