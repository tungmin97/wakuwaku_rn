import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useAppSelector } from '@src/app/hooks/main';

const { width } = Dimensions.get('screen');

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

import { useAuth } from '@app/hooks/useAuth';

  const { user, isLoading, handleSignOut } = useAuth();
  isLoading && <ActivityIndicator />;

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Text className="mr-auto font-main font-extrabold text-3xl text-platinum p-3">
        Profile & Setting
      </Text>
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
      <View className="flex-row justify-center mt-2 mb-10 items-center">
        <TextInput
          className="text-lg text-ghostWhite mr-2 font-main"
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
          <Text className="text-base ml-3 text-ghostWhite font-main">My List</Text>
        </View>
        <AntDesign name="right" size={25} color="#6a6a6a" />
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="flex-row justify-between w-11/12 p-3 mx-auto bg-gray rounded-md">
          <View className="flex flex-row justify-center items-center">
            <AntDesign name="retweet" size={25} color="#f8f7ffff" />
            <Text className="text-base ml-3 text-ghostWhite font-main">Switch Mode</Text>
          </View>
          <AntDesign name="right" size={25} color="#6a6a6a" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-davysGrey p-3 absolute bottom-0 mb-10 rounded-xl self-center"
        style={{ width: width - 50 }}
        onPress={signOutHandler}>
        <Text className="text-ghostWhite text-center font-main text-base">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}