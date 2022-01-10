import React,{ useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import firebase from "../firebase";

// const db = firebase.firestore().collection("alerts");

const db = SQLite.openDatabase("alerts.db");

const SAMPLE_ALERTS = [
  { title: "Low battery detected in Prosthetic. You are advised to change the battery within the next 2 weeks. ", id: "0", type: "battery", date: "0d"},
  { title: "Fall detected. Emergency Contacts informed. ", id: "1", type: "danger", date: "0d"},
];

export default function AlertsScreen({ route, navigation }) {
  const [alerts, setAlerts] = useState(SAMPLE_ALERTS);

  function refreshAlerts() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM alerts",
      null, 
      (txtObj, {rows: {_array } }) => setAlerts(_array),
      (txtObj, error) => console.log("Error: ", error)
      );
    });
  }

  useEffect(() => {
    db.transaction(
    (tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS alerts
      (id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      type TEXT);`);
    },
    null,
    refreshAlerts
    );
  }, []);

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  return(
    <View>
      <Text style={styles.dateText}>Today</Text>
      <View style={styles.listItem}>
        <MaterialCommunityIcons name="alert-box-outline" size={30} color="#484a4a" />
        <Text style = {styles.listText}>Fall detected. Emergency Contacts informed. </Text>
      </View>

      <Text style={styles.dateText}>2w</Text>
      <View style={styles.listItem}>
        <MaterialCommunityIcons name="battery-alert-variant" size={30} color="#484a4a" style={{paddingLeft: 30,}}/>
        <Text style = {styles.listText}>Low battery detected in Prosthetic. You are advised to change the battery within the next 2 weeks. </Text>
      </View>
      
    </View>
  )
}

// <FlatList style={styles.list} data={SAMPLE_ALERTS} renderItem={renderItem} />

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 20,
    margin: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    flexDirection: "row"
  },
  listText: {
    marginHorizontal: 20,
    fontSize: 15,
    flexWrap: "wrap",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 23,
    marginTop: 15, 
  },
});

// export default function AlertsScreen({ navigation, route }) {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={addNote}>
//           <Ionicons
//             name="ios-create-outline"
//             size={30}
//             color="black"
//             style={{
//               color: "#f55",
//               marginRight: 10,
//             }}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   });

//   // Monitor route.params for changes and add items to the database
//   useEffect(() => {
//     if (route.params?.text) {
//       const newNote = {
//         title: route.params.text,
//         done: false,
//       };
//       db.add(newNote);
//     }
//   }, [route.params?.text]);

//   // Load Firebase data on start
//   useEffect(() => {
//     const unsubscribe = db.onSnapshot((collection) => {
//       const updatedNotes = collection.docs.map((doc) => {
//         return {
//           id: doc.id,
//           ...doc.data(),
//         };
//       });
//       setNotes(updatedNotes);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   function addNote() {
//     navigation.navigate("Add Screen");
//   }

//   // This deletes an individual note
//   function deleteNote(id) {
//     console.log("Deleting " + id);
//     // To delete that item, we filter out the item we don't want
//     db.doc(id).delete();
//   }

//   // The function to render each row in our FlatList
//   function renderItem({ item }) {
//     return (
//       <View
//         style={{
//           padding: 10,
//           paddingTop: 20,
//           paddingBottom: 20,
//           borderBottomColor: "#ccc",
//           borderBottomWidth: 1,
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text>{item.title}</Text>
//         <TouchableOpacity onPress={() => deleteNote(item.id)}>
//           <Ionicons name="trash" size={16} color="#944" />
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notes}
//         renderItem={renderItem}
//         style={{ width: "100%" }}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// }