import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const SuccessfulOnboarding = ({ personalDetails, patientDetails }) => {
  return (
    <View style={styles.page}>
      <View style={styles.formContainer}>
        <Text> You are registered ! </Text>
        <View style={styles.inputContainer}></View>
        <Text>{JSON.stringify(personalDetails, null, 2)}</Text>
        <Text>{JSON.stringify(patientDetails, null, 2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 1,
  },

  userWelcome: {
    flexDirection: 'column',
    width: '90%',
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },

  page: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: '#F6F6F6',
  },
  formHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#978055',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 13,
    fontFamily: 'GillSans-Light',
  },
});

export default SuccessfulOnboarding;
