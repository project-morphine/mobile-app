import React from 'react';
import {
  View,
  Image,
} from 'react-native';

export default function LocatePatientScreen() {
    return(
      <View>
        <Image source={{uri: 'https://i.gifer.com/9yCP.gif'}}
         style={{justifyContent:"center", width: "95%", height: "90%", margin: 10,  }} />
      </View>
    );
  }