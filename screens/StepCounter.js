import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Path } from 'react-native';

export default function StepCounterScreen() {
  const [steps, setSteps] = useState(0)

  function IncreaseCount() {
    setSteps(steps + 1)
    // console.log({steps})
  };

  function DecreaseCount() {
    setSteps(steps - 1)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps Count</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text>Number of Steps: {steps}</Text>
      
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={IncreaseCount}><Text>Increase</Text></TouchableOpacity>
        <Text>  </Text>
        <TouchableOpacity onPress={DecreaseCount}><Text>decrease</Text></TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
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
