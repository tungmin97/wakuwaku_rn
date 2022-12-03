import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  createReminderNotification,
  displayNotification,
} from '@services/notification/notificationService';

GoogleSignin.configure({
  webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const getDate = () => {
    const dateNew = new Date(Date.now());

    dateNew.setSeconds(dateNew.getSeconds() + 7);
    return dateNew;
  };

  const handleScheduleNotification = (id: number, name: string, time: Date) =>
    createReminderNotification({ id, name, time });

  const handleNotification = () => {
    displayNotification();
  };

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
        <TouchableOpacity onPress={handleNotification} className="bg-black px-5 rounded-md">
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
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
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
      <TouchableOpacity onPress={() => handleScheduleNotification(1, 'test', getDate())}>
        <Text className="text-platinum">Push data to server</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
