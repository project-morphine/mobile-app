import { Button, HelperText, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown-v2';
import React from 'react';
import countryList from 'react-select-country-list';

// TODO : https://github.com/react-native-picker/picker

const REGEX = {
  personalName: /^[a-zA-Z ]+$/,
  email:
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
  houseOrUnit: /^[a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -]*$/,
  postalCode: /^[0-9]*$/,
  age: /^[0-9]*$/,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME_INVALID: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
  EMAIL_INVALID: 'Not a Valid Email',
};

const options = countryList().getData();

const PersonalDetails = ({ handlePersonalDetails, personalDetails }) => {
  const { control, errors, formState, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const submit = (data) => {
    handlePersonalDetails(data, 1);
  };

  return (
    <View style={styles.page}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            defaultValue={personalDetails.firstName}
            name='firstName'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                message: 'Not a Valid First Name',
                value: REGEX.personalName,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode='outlined'
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='First Name'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.firstName && true}
                />
                {errors.firstName && (
                  <HelperText type='error'>
                    {errors.firstName.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            defaultValue={personalDetails.lastName}
            name='lastName'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                message: 'Not a Valid Last Name',
                value: REGEX.personalName,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode='outlined'
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Last Name'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.lastName && true}
                />
                {errors.lastName && (
                  <HelperText type='error'>
                    {errors.lastName.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name='email'
            defaultValue={personalDetails.email}
            rules={{
              required: {
                message: ERROR_MESSAGES.REQUIRED,
                value: true,
              },
              pattern: {
                value: REGEX.email,
                message: ERROR_MESSAGES.EMAIL_INVALID,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  mode='outlined'
                  autoCorrect={false}
                  returnKeyType='default'
                  keyboardType='email-address'
                  keyboardAppearance='default'
                  value={value}
                  style={styles.singleInput}
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Email'
                  onBlur={onBlur}
                  textContentType='emailAddress'
                  autoCompleteType='off'
                  autoCapitalize='none'
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.email && true}
                />
                {errors.email && (
                  <HelperText type='error'>{errors.email.message}</HelperText>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            defaultValue={personalDetails.country}
            name='country'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <Dropdown
                  mode='outlined'
                  itemCount={3}
                  data={options}
                  labelFontSize='2'
                  error={errors.country && true}
                  value={value}
                  style={styles.dualInput}
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Country'
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                />
                {errors.country && (
                  <HelperText type='error'>{errors.country.message}</HelperText>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            defaultValue={personalDetails.age}
            name='age'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                message: 'Not a Valid Age',
                value: REGEX.age,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode='outlined'
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Age'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.age && true}
                />
                {errors.age && (
                  <HelperText type='error'>{errors.age.message}</HelperText>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            defaultValue={personalDetails.houseOrUnit}
            name='houseOrUnit'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                message: 'Not a Valid House or Unit No',
                value: REGEX.houseOrUnit,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode='outlined'
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Unit Number'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.houseOrUnit && true}
                />
                {errors.houseOrUnit && (
                  <HelperText type='error'>
                    {errors.houseOrUnit.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            defaultValue={personalDetails.postalCode}
            name='postalCode'
            rules={{
              required: {
                value: true,
                message: ERROR_MESSAGES.REQUIRED,
              },
              pattern: {
                message: 'Not a Valid Postal Code',
                value: REGEX.postalCode,
              },
            }}
            render={({ onBlur, onChange, value }) => (
              <View>
                <TextInput
                  style={styles.dualInput}
                  mode='outlined'
                  selectionColor='#978055'
                  underlineColor='#978055'
                  label='Postal Code'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  error={errors.postalCode && true}
                />
                {errors.postalCode && (
                  <HelperText type='error'>
                    {errors.postalCode.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <Button
        color='#171E4A'
        mode='contained'
        onPress={handleSubmit(submit)}
        disabled={!formState.isValid}
        compact='true'
        labelStyle={styles.insideTheButton}
        style={{ width: 150, marginLeft: 120 }}
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
    paddingHorizontal: 1,
    marginBottom: 40,
  },
  dualInput: {
    width: 150,
    marginTop: 0.34,
  },
  singleInput: {
    width: 350,
  },

  page: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#F6F6F6',
  },
  insideTheButton: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
  },
});

export default PersonalDetails;
