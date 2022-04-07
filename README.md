# Mobile-Application for Project Morphine

# FEATURES
- Step Counter (Home Tab)
- Push Notifications for Alerts (Alerts Tab) - currently non-functional
- Settings Page for Patient to customize, currently not linked to Firebase, In-app Preferences not functional

# POSSIBLE FUTURE UPDATES: 
- Location visualisation
- Posture Correction Reminders
- Dashboard for Activities (Home Tab)

# Requirements of App
Allow patients to keep track of their daily step count
Contacts emergency contacts in the case of a detected fall
Notifies patients of low battery level in prosthetic

# Guide to different components
The different frames are currently written in javascript files, though there are three files (under screens: "NotFoundScreen.tsx", "TabOneScreen.tsx", "TabTwoScreen.tsx") in '.tsx' format, those files are from the original template and are not used in this app.

Current Frames (returned in MyStack() in App.js): 
1. Login Page (./screens/LoginScreen.js)
    Linked to Firebase Authentication, keying in a username and password in the LoginPage and pressing sign up will register an account an allow for login

2. Tabs Stack (Home Tab, Notifications Tab, Settings Tab)
    - Home Tab (./screens/StepCounter.js)
        > step counter not linked to firebase
        > future improvements could include a dashboard for activities (exercise prescribed, or previous week/month's track record)
        
    - Alerts Tab (./screens/AlertsScreen.js)
        > currently a dummy screen

    - Settings Tab (./screens/SettingsScreen.js)
        > has a hidden pop up button which says FALL DETECTED, locate the patient and cancel function (somewhere in the white space between the 3 main buttons and the sign out button)
        locate the patient brings you to a gif of a map (dummy too)
        > In-app Preferences (currently dummy screen)
        > Emergency Contacts 
            Users can update and add new emergency contacts
            This feature has not been linked to different user profiles in firebase
        > Prosthetic FAQs
            FAQs are currently linked to an online URL on our original partner's webpage

3. Setup Screens
    All SetupScreens are returned in ./screens/Wizard.js
    - Patient Details (./screens/PatientDetails.js)
    - Personal Details (./screens/PersonalDetails.js)
    - Phone Verification (./screens/PhoneVerification.js)
    - Successful Onboarding (./screens/SuccessfulOnboarding.js)

# Visual Reference of the Application
https://whimsical.com/morphine-app-ETwAPHR4rNEiKFLvBb75SR 
(Bottom are the actual sccreenshots from the app)

# KNOWN ISSUES
Render Error in SetupScreens
- This causes the SetupScreen to not be rendered
- These screens were actually developed by the senior team (2020-2021 Team)
- We have not been able to find the source of the issue, but we believe that this may have something to do with the updates of the libraries since the issue only occurred after various updates.


# REMARKS
we are sorry for the horrible quality of the code, thank you. 