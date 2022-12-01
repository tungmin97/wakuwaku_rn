import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
  webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View className="flex-1 bg-black">
      <Text className="text-maxRed mt-10 font-title text-4xl text-center">WakuWaku</Text>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#F8F7FF"
          className="bg-davysGrey rounded-md mx-5 mb-2 p-3"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#F8F7FF"
          className="bg-davysGrey rounded-md mx-5 p-3"
        />
      </View>

      <View className=" border-davysGrey border-2 rounded-md mx-5 mt-7">
        <TouchableOpacity className="bg-black px-5 rounded-md">
          <Text className="text-ghostWhite text-center py-3 font-main font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>
      <View className=" border-davysGrey border-2 rounded-md mx-5 mt-2">
        {/* <TouchableOpacity className="bg-black px-5 rounded-md">
          <Text className="text-ghostWhite text-center py-3 font-main font-bold">
            Login with Google
          </Text>
        </TouchableOpacity> */}
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text className="text-darkGray font-bold font-main text-center">
          New to WakuWaku? Sign up now.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loginEmailHandler}>
        <Text>Login With Email (Create and Sign In)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
