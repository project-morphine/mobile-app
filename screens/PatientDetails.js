import { Button, DataTable, HelperText, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { Dropdown } from "react-native-material-dropdown-v2";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

// TODO : https://github.com/react-native-picker/picker

const ERROR_MESSAGES = {
  REQUIRED: "This Field Is Required",
};

const options = [{ value: "Arm" }, { value: "Leg" }, { value: "Ear" }];

const PatientDetails = ({ handlePatientDetails, patientDetails }) => {
  const { control, errors, formState, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const submit = (data) => {
    //console.log("from submit" + data);
    handlePatientDetails(data, 2);
  };

  return (
    <View style={styles.page}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            defaultValue={patientDetails.prosthesis}
            name="prosthesis"
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <Dropdown
                  mode="outlined"
                  itemCount={3}
                  data={options}
                  labelFontSize="2"
                  error={errors.prosthesis && true}
                  value={value}
                  style={styles.dualInput}
                  selectionColor="#978055"
                  underlineColor="#978055"
                  label="Select type of Prosthesis"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  multiline={true}
                />
                {errors.prosthesis && (
                  <HelperText type="error">
                    {errors.prosthesis.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            defaultValue={patientDetails.remarks}
            name="remarks"
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode="outlined"
                  selectionColor="#978055"
                  underlineColor="#978055"
                  label="Remarks"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  error={errors.remarks && true}
                  multiline={true}
                />
                {errors.remarks && (
                  <HelperText type="error">{errors.remarks.message}</HelperText>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            defaultValue={patientDetails.medicalConditions}
            name="medicalConditions"
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.singleInput}
                  mode="outlined"
                  selectionColor="#978055"
                  underlineColor="#978055"
                  label="Medical Conditions"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  error={errors.medicalConditions && true}
                  multiline={true}
                />
                {errors.medicalConditions && (
                  <HelperText type="error">
                    {errors.medicalConditions.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button
            color="#171E4A"
            mode="contained"
            onPress={() => {
              const data = getValues();
              handlePatientDetails(data, 0);
            }}
            compact="true"
            labelStyle={styles.insideTheButton}
            style={styles.dualInput}
          >
            Prev
          </Button>

          <Button
            color="#171E4A"
            mode="contained"
            onPress={handleSubmit(submit)}
            disabled={!formState.isValid}
            compact="true"
            labelStyle={styles.insideTheButton}
            style={styles.dualInput}
          >
            Next
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 5,
    // borderColor: "black",
    // borderWidth: 1,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "98%",
    paddingHorizontal: 1,
    marginBottom: 60,
    // overflow: "hidden",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  dualInput: {
    width: 150,
    height: 54,
    marginTop: 0.34,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  singleInput: {
    height: 64,
    width: 330,
    // borderColor: "green",
    // borderWidth: 1,
  },

  page: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#F6F6F6",
    // borderColor: "black",
    // borderWidth: 1,
  },

  insideTheButton: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
});
