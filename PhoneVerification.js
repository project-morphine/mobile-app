import { Button, HelperText, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ERROR_MESSAGES = {
  REQUIRED: "This Field Is Required",
};

const PhoneVerification = ({ handlePhoneVerification, code }) => {
  const { control, errors, formState, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const submit = (code) => {
    handlePhoneVerification(code, true, 2);
  };
  return (
    <View style={styles.page}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="verificationCode"
            defaultValue={code}
            rules={{
              required: {
                message: ERROR_MESSAGES.REQUIRED,
                value: true,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  mode="outlined"
                  autoCorrect={false}
                  returnKeyType="default"
                  keyboardType="number-pad"
                  keyboardAppearance="default"
                  value={value}
                  style={styles.singleInput}
                  selectionColor="#978055"
                  underlineColor="#978055"
                  label="Verification Code sent to"
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.verificationCode && true}
                />
                {errors.verificationCode && (
                  <HelperText type="error">
                    {errors.verificationCode.message}
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
              const code = getValues("verificationCode");
              handlePhoneVerification(code, false, 1);
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
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

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
    height: 44,
    marginTop: 0.34,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  singleInput: {
    height: 44,
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

export default PhoneVerification;
