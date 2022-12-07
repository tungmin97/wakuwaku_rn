import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@app/hooks/useAuth';
import { RootStackProps } from '@src/types/types';
import { useSetAndGetUser } from '@app/hooks/useSetAndGetUser';
import { setCurrentUser } from '@services/users/userSlice';
import ImagePicker from 'react-native-image-crop-picker';
import { useAppDispatch, useViewportUnits } from '@app/hooks/main';
import { useMMKVObject } from 'react-native-mmkv';
import { SetUserProps } from 'src/types/authTypes';
import FastImage from 'react-native-fast-image';

export default function UserScreen({ navigation }: RootStackProps) {
  const dispatch = useAppDispatch();
  const { handleSignOut } = useAuth();
  const { updateUsername, getUser, updateUserAvatar } = useSetAndGetUser();
  const { vw } = useViewportUnits();
  const [data, setData] = useMMKVObject<SetUserProps>('credential');
  const [newUsername, setNewUsername] = useState<string | null>('');
  const [isUploading, setIsUploading] = useState(false);
  const handleUsername = (input: string) => setNewUsername(input);
  const handleSubmit = async () => {
    setData({ ...data!, username: newUsername! });
    if (newUsername !== data?.username) {
      setData({ ...data, username: newUsername });
      await updateUsername(data?.uid!, newUsername!);
    }
  };

  const handleUpdateAvatar = () =>
    ImagePicker.openPicker({
      cropping: true,
    })
      .then((image) => {
        setIsUploading(true);
        updateUserAvatar(data?.uid!, image.path);
      })
      .then(async () => {
        setIsUploading(false);
        dispatch(setCurrentUser(await getUser(data?.uid!)));
      });

  if (!data) {
    <ActivityIndicator />;
  }

  const style = StyleSheet.create({
    cameraIcon: { position: 'absolute', alignSelf: 'center', top: 100 },
    signOut: { width: vw * 100 - 50 },
  });

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <View className="flex-1">
        <Text className="mr-auto font-main font-extrabold text-3xl text-platinum p-3">
          Profile & Settings
        </Text>
        <View className="flex">
          {isUploading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: data?.avatar }}
              className="w-36 h-36 mt-10 self-center rounded-full border-4 border-white"
            />
          )}
          <TouchableOpacity style={style.cameraIcon} onPress={handleUpdateAvatar}>
            <AntDesign name="camera" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-2 mb-10 items-center">
          <TouchableOpacity className="flex-row items-center">
            <TextInput
              className="text-lg text-ghostWhite mr-2 font-main"
              defaultValue={data?.username!}
              maxLength={30}
              autoCapitalize="words"
              autoComplete="name"
              enablesReturnKeyAutomatically={true}
              onChangeText={handleUsername}
              onSubmitEditing={handleSubmit}
            />
            <AntDesign name="edit" size={20} color="#f8f7ffff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex-row justify-between w-11/12 p-3 mb-6 mx-auto bg-gray rounded-md"
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <View className="flex flex-row justify-center items-center">
            <AntDesign name="bells" size={25} color="#f8f7ffff" />
            <Text className="text-base ml-3 text-ghostWhite font-main">Notification</Text>
          </View>
          <AntDesign name="right" size={25} color="#6a6a6a" />
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
      </View>
      <TouchableOpacity
        className="bg-davysGrey p-3 mb-10 rounded-xl self-center"
        style={style.signOut}
        onPress={handleSignOut}>
        <Text className="text-ghostWhite text-center font-main text-base">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
