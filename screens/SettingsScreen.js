import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView, 
  FlatList,
  TextInput, 
  Vibration,
  Button, 
  Alert,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
// import { Picker } from 'react-native-picker';
import {Picker} from '@react-native-community/picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import PatientDetails from './PatientDetails';
import LocatePatientScreen from './LocatePatientScreen';

export default function Settings() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Preferences" component={PreferencesSubScreen} />
        <Stack.Screen name="Emergency Contacts" component={EmergencyContactsSubScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Prosthetic FAQ" component={ProstheticFAQSubScreen}/>
        <Stack.Screen name="LocatePatient" component={LocatePatientScreen}/>
      </Stack.Navigator>
  );
}

function SettingsScreen({ navigation }) {
  const fallDetectedAlert = () =>
  Alert.alert(
    "FALL DETECTED",
    "Dear User, A fall has been detected in the patient.",
    [
      {
        text: "Locate the patient",
        onPress: () => navigation.navigate("LocatePatient")
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
    ]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      
      <TouchableOpacity onPress={() => navigation.navigate("Preferences")}>
        <View style={styles.buttonContainer}>
          <Text>  </Text>
          <MaterialIcons name="app-settings-alt" size={24} color="white" style={{margin: 8}}/>
          <Text style={styles.buttonText}>
          In-app Preferences
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={styles.buttonSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <TouchableOpacity onPress={() => navigation.navigate("Emergency Contacts")}>
        <View style={styles.buttonContainer}>
          <Text>  </Text>
          <MaterialIcons name="perm-contact-cal" size={24} color="white" style={{margin: 8}}/>
          <Text style={styles.buttonText}>
          Emergency Contacts
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={styles.buttonSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <TouchableOpacity onPress={() => navigation.navigate("Prosthetic FAQ")}>
        <View style={styles.buttonContainer}>
          <Text>   </Text>
          <FontAwesome name="question" size={24} color="white" style={{margin: 8}}/>
          <Text> </Text>
          <Text style={styles.buttonText}>
          Prosthetic FAQs
          </Text>
        </View>
      </TouchableOpacity>
{/* 
      <View
        style={styles.bigButtonSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
       */}
      {/* <Button title="Give me an alert!" onPress={fallDetectedAlert}></Button> */}
      <TouchableOpacity style={styles.alert} onPress = {fallDetectedAlert}>
        <Text style={styles.alertButtonText}>
          Give me an alert!  
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => auth.signOut().then(() => {navigation.replace("Login")}).catch(error => alert(error.message))}>
        <View style={styles.signOutBtn}>
          <Text style={styles.signOutText}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>

        <Text> </Text>
      </View>
    </SafeAreaView>
  );
}

//SUB SCREEN 1: PREFERENCES
function PreferencesSubScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>Theme</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Light" value="Light"/>
          <Picker.Item label="Dark" value="Dark"/>
        </Picker>

      <Text style={styles.normalText}>Daily Steps Goal</Text>
        <TextInput style={styles.textInput}/> 
        {/* //daily steps goal is currently not linked to any storage place */}
    </View>
)};

//SUB SCREEN2: EMERGENCY CONTACTS
function EmergencyContactsSubScreen({ route, navigation }) {
  const SAMPLE_CONTACTS = [
  { name: "Emergency Contact 1", number: "91234567", id: "0" }];
  const[contacts,setContacts] = useState(SAMPLE_CONTACTS);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Add")} style={{margin: 15}}>
          <FontAwesome name="plus" size={18} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.contactName) {
      const newContact = {
        name: route.params.contactName,
        id: contacts.length.toString(),
        number: route.params.contactNumber,
      };
      setContacts([...contacts, newContact]);
    }
  }, [route.params?.contactName], [route.params?.contactNumber]);

  //renderItem function is for displaying items in the FlatList below
  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Text>{item.number}</Text>
      </View>
    );
  }
  
  //Contacts reflected in the Emergency Contacts Screen
  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={contacts} renderItem={renderItem} />
    </View>
  );
}

//SUBSUBSCREEN under EMERGENCY CONTACTS SCREEN
function AddScreen({ navigation }){
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  return(
    <View style={{flex: 1, backgroundColor: "lightgrey", alignItems: "center"}}>
      <Text style={styles.normalText}>Name</Text>
      <TextInput  style={styles.textInput} onChangeText={(text) => setContactName(text)}/>
      <Text style={styles.normalText}> Contact Number </Text>
      <TextInput style={styles.textInput}
      onChangeText={(number) => setContactNumber(number)}/>  
      <TouchableOpacity
        onPress={() => navigation.navigate("Emergency Contacts", { contactName, contactNumber })}
        style={{
          margin: 15,
          backgroundColor: '#171E4A',
          width: 120,
          borderRadius: 6,
          alignItems: "center", 
        }}
      >
        <Text style={{
          fontSize: 14,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          padding: 10,
          color: "white", 
          fontWeight: "bold",
        }}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

//SUB SCREEN 3: Prosthetic FAQs
function ProstheticFAQSubScreen() {
  return(
    <View>
      <Text>
        FAQs go here!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  normalText: {
    fontSize: 16,
    alignItems: "center",
    marginTop: 8
  },
  separator: {
    marginVertical: 20,
    height: 1,
    // width: '80%',
  },

  buttonSeparator: {
    marginVertical: 8, 
    height: 1, 
    // width: '80%',
  },

  bigButtonSeparator: {
    marginVertical: 8,
    // height: 350,
    height: "45%",
  },

  buttonContainer: {
    // width: "80%",
    borderRadius: 5,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171E4A",
    width: 330, 
    flexDirection: "row",
    marginVertical: 5
  }, 

  buttonText: {
    // margin: 10, 
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // padding: 25,
    color: "white", 
    fontWeight: 'bold',
  },

  signOutBtn: {
    borderRadius: 5,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    width: 330, 
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "white", 
    borderColor: "#171E4A",
    borderWidth: 3,
  },
  signOutText: {
    color: "#171E4A",
    fontWeight: "bold",
    fontSize: 18,
  },

  list: {
    width: '99%'
  },

  listItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingLeft: 20,
  }, 

  picker: {
    width: 300, 
    height: 45, 
    borderColor: "grey", 
    borderWidth: 2, 
  },

  textInput: {
    borderColor: "black",
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    width: "90%",
    marginBottom: 6,
  },
  alert: {
    // alignItems: "center",
    height: "48%",
    width: "100%", 
    // backgroundColor:"red",
  },
  alertButtonText: {
    // color: "#0000ffff",
    color: 'lightgrey',
    fontSize: 1,
  },
});
