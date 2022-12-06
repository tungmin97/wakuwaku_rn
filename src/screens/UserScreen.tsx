import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/main';
import { useAuth } from '@app/hooks/useAuth';
import { RootStackProps } from '@src/types/types';
import { SetUserProps } from '@src/types/authTypes';
import { useSetAndGetUser } from '@src/app/hooks/useSetAndGetUser';
import { setCurrentUser } from '@src/services/users/userSlice';
import ImagePicker from 'react-native-image-crop-picker';

const { width } = Dimensions.get('screen');

export default function UserScreen({ navigation }: RootStackProps) {
  const { isLoading, handleSignOut } = useAuth();
  const { updateUsername, getUser, updateUserAvatar } = useSetAndGetUser();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser?.data() as SetUserProps);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [editUsername, setEditUsername] = useState('');

  isLoading && <ActivityIndicator />;

  const onPressHandler = async () => {
    if (!isOnEdit) {
      setIsOnEdit(true);
    } else {
      setIsOnEdit(false);
      if (editUsername !== user.username) {
        await updateUsername(user.uid, editUsername);
      }
      dispatch(setCurrentUser(await getUser(user.uid)));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Text className="mr-auto font-main font-extrabold text-3xl text-platinum p-3">
        Profile & Setting
      </Text>
      <View className="flex">
        <Image source={{ uri: user.avatar }} className="w-36 h-36 mt-10 self-center rounded-2xl" />
        <TouchableOpacity
          style={style.cameraIcon}
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then((image) => {
                updateUserAvatar(user.uid, image.path);
              })
              .then(async () => {
                dispatch(setCurrentUser(await getUser(user.uid)));
              });
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
        <TouchableOpacity onPress={onPressHandler}>
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
        style={style.signOut}
        onPress={handleSignOut}>
        <Text className="text-ghostWhite text-center font-main text-base">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  cameraIcon: { position: 'absolute', alignSelf: 'center', top: 100 },
  signOut: { width: width - 50 },
});
