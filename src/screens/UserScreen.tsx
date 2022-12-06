import {
  View,
  Text,
  Image,
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
import { useAsyncStorage } from '@app/hooks/useAsyncStorage';
import { useAppDispatch, useViewportUnits } from '@app/hooks/main';

export default function UserScreen({ navigation }: RootStackProps) {
  const dispatch = useAppDispatch();
  const { handleSignOut } = useAuth();
  const { updateUsername, getUser, updateUserAvatar } = useSetAndGetUser();
  const { vw } = useViewportUnits();
  const { data, setStorage } = useAsyncStorage('credential');
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [newUsername, setNewUsername] = useState<string | null>('');
  const handleUsername = (input: string) => setNewUsername(input);
  const handleSubmitUsername = () => {
    setStorage({ ...data!, username: newUsername });
  };

  if (!data) {
    <ActivityIndicator />;
  }

  const onPressHandler = async () => {
    if (!isOnEdit) {
      setIsOnEdit(true);
    } else {
      setIsOnEdit(false);
      if (newUsername !== data?.username) {
        await updateUsername(data?.uid!, newUsername!);
      }
      dispatch(setCurrentUser(await getUser(data?.uid!)));
    }
  };

  const style = StyleSheet.create({
    cameraIcon: { position: 'absolute', alignSelf: 'center', top: 100 },
    signOut: { width: vw * 100 - 50 },
  });

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Text className="mr-auto font-main font-extrabold text-3xl text-platinum p-3">
        Profile & Settings
      </Text>
      <View className="flex">
        <Image source={{ uri: data?.avatar }} className="w-36 h-36 mt-10 self-center rounded-2xl" />
        <TouchableOpacity
          style={style.cameraIcon}
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then((image) => {
                updateUserAvatar(data?.uid!, image.path);
              })
              .then(async () => {
                dispatch(setCurrentUser(await getUser(data?.uid!)));
              });
          }}>
          <AntDesign name="camera" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mt-2 mb-10 items-center">
        <TextInput
          className="text-lg text-ghostWhite mr-2 font-main"
          defaultValue={data?.username!}
          editable={isOnEdit}
          onChangeText={handleUsername}
          onSubmitEditing={handleSubmitUsername}
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
