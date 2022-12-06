import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useAppSelector } from '@src/app/hooks/main';

export default function UserScreen() {
  const navigation = useNavigation();
  const res = useAppSelector((state) => state.user.currentUser);
  const user = res._j._data;
  console.log(user);

  const [isOnEdit, setIsOnEdit] = useState(false);
  const [editUsername, setEditUsername] = useState('');

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
        <Image source={{ uri: user.avatar }} className="w-36 h-36 mt-10 self-center rounded-2xl" />
        <TouchableOpacity
          style={{ position: 'absolute', alignSelf: 'center', top: 100 }}
          onPress={() => {
            launchImageLibrary({
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            });
            launchCamera(() => {});
          }}>
          <AntDesign name="camera" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-5 items-center">
        <TextInput
          className="text-lg text-ghostWhite mr-2"
          defaultValue={user.username}
          editable={isOnEdit}
          onChangeText={(text) => setEditUsername(text)}
        />
        <TouchableOpacity
          onPress={() => {
            !isOnEdit ? setIsOnEdit(true) : setIsOnEdit(false);
          }}>
          <AntDesign name="edit" size={20} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
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
