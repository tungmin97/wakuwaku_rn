import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
  const navigation = useNavigation();
  const signOutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <TouchableOpacity className="flex-row items-center ml-2 mt-2">
        <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
        <Text className="text-xl ml-2 text-ghostWhite">Profile & Setting</Text>
      </TouchableOpacity>
      <View className="flex">
        <Image
          source={require('../assets/Images/avatar.png')}
          className="w-36 h-36 mt-10 self-center rounded-2xl"
        />
      </View>
      <Text className="text-center mt-3 text-lg mb-3 text-ghostWhite">User Name</Text>
      <TouchableOpacity
        className="flex-row justify-center"
        onPress={() => {
          navigation.navigate('ChangeUserInfo');
        }}>
        <Text className="text-center text-base mb-10 mr-3 text-ghostWhite">Change Information</Text>
        <AntDesign name="edit" size={25} color="#f8f7ffff" />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row justify-between w-11/12 p-3 mb-6 mx-auto bg-gray rounded-md"
        onPress={() => {
          navigation.navigate('Watchlist');
        }}>
        <View className="flex flex-row justify-center items-center">
          <AntDesign name="menuunfold" size={25} color="#f8f7ffff" />
          <Text className="text-base ml-3 text-ghostWhite">My List</Text>
        </View>
        <AntDesign name="right" size={25} color="#6a6a6a" />
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="flex-row justify-between w-11/12 p-3 mx-auto bg-gray rounded-md">
          <View className="flex flex-row justify-center items-center">
            <AntDesign name="retweet" size={25} color="#f8f7ffff" />
            <Text className="text-base ml-3 text-ghostWhite">Switch Mode</Text>
          </View>
          <AntDesign name="right" size={25} color="#6a6a6a" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOutHandler}>
        <Text className="text-xl self-center rounded-md px-4 py-2 mt-20 text-ghostWhite">
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
