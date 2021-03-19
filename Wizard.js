import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import PatientDetails from "./PatientDetails";
import PersonalDetails from "./PersonalDetails";
import PhoneVerification from "./PhoneVerification";
import SuccessfulOnboarding from "./SuccessfulOnboarding";
import SvgAvatar from "./assets/IconAvatar.svg";
import SvgCompany from "./assets/TPC-Website.svg";

const Wizard = (props) => {
  // user input state management
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    age: "",
    country: "",
    email: "",
    firstName: "",
    houseOrUnit: "",
    lastName: "",
    postalCode: "",
  });

  const [patientDetails, setPatientDetails] = useState({
    prosthesis: "",
    medicalConditions: "",
    remarks: "",
  });

  // functions to handle input from user
  const handlePersonalDetails = (data, num) => {
    setPersonalDetails(data);
    setActiveStep(num);
  };

  const handlePatientDetails = (data, num) => {
    setPatientDetails(data);
    setActiveStep(num);
  };

  const handlePhoneVerification = (messageCode, status, num) => {
    setCode(messageCode);
    setIsFinished(status);
    setActiveStep(num);
  };

  let pageName = "";

  switch (activeStep) {
    case 0:
      pageName = "personal details";
      break;
    case 1:
      pageName = "medical details";
      break;
    case 2:
      pageName = "verification code";
  }

  return (
    <SafeAreaView>
      <View style={styles.headerAcrossAllPages}>
        <View style={styles.svgCompany}>
          <SvgCompany width={212} height={64} />
        </View>
        <View style={styles.svgAvatar}>
          <SvgAvatar width={53.06} height={47} />
        </View>
      </View>
      <View>
        <View style={styles.userWelcome}>
          <Text style={styles.formHeader}>Welcome to Prosthetic Company</Text>
          <Text style={styles.subHeader} numberOfLines={2}>
            Kindly fill in your {pageName} to verify your account
          </Text>
        </View>
      </View>

      <View style={styles.userDetails}>
        {!isFinished && (
          <ProgressSteps
            completedProgressBarColor="#171E4A"
            activeStepIconColor="#171E4A"
            activeStepIconBorderColor="#171E4A"
            activeStepNumColor="white"
            marginBottom={30}
            labelFontSize={10}
            completedStepIconColor="#171E4A"
            completedLabelColor="black"
            activeLabelColor="black"
            topOffset={10}
            activeLabelFontSize={10}
            progressBarColor="#171E4A"
            activeStep={activeStep}
          >
            <ProgressStep label="Personal Details" removeBtnRow={true}>
              <PersonalDetails
                handlePersonalDetails={handlePersonalDetails}
                personalDetails={personalDetails}
              />
            </ProgressStep>
            <ProgressStep label="Patient Details" removeBtnRow={true}>
              <PatientDetails
                handlePatientDetails={handlePatientDetails}
                patientDetails={patientDetails}
              />
            </ProgressStep>
            <ProgressStep label="Phone Verification" removeBtnRow={true}>
              <PhoneVerification
                handlePhoneVerification={handlePhoneVerification}
                code={code}
              />
            </ProgressStep>
          </ProgressSteps>
        )}
        {isFinished && (
          <SuccessfulOnboarding
            personalDetails={personalDetails}
            patientDetails={patientDetails}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formHeader: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#978055",
    // borderColor: "black",
    // borderWidth: 1,
    marginBottom: 5,
    padding: 1,
  },
  subHeader: {
    fontSize: 12,
    fontFamily: "GillSans-Light",
    // borderColor: "black",
    // borderWidth: 1,
  },
  userWelcome: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    // borderColor: "black",
    // borderWidth: 1,
    marginTop: 2,
  },
  userDetails: {
    backgroundColor: "#F6F6F6",
    flex: 1,
    marginTop: 0,
    // borderColor: "blue",
    // borderWidth: 1,
    // justifyContent: "",
  },
  svgCompany: {
    // borderColor: "green",
    // borderWidth: 1,
    marginLeft: 21,
    marginTop: 10,
  },
  svgAvatar: {
    // borderColor: "green",
    // borderWidth: 1,
    marginTop: 10,
    marginLeft: 71,
  },
  headerAcrossAllPages: {
    // borderColor: "red",
    // borderWidth: 1,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Wizard;
