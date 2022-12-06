import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '@app/hooks/useAuth';
import { RootStackProps } from '@src/types/types';
import { useAsyncStorage } from '@app/hooks/useAsyncStorage';
import { useViewportUnits } from '@app/hooks/main';

export default function UserScreen({ navigation }: RootStackProps) {
  const { vw } = useViewportUnits();
  const { handleSignOut } = useAuth();
  const { data, setStorage } = useAsyncStorage('credential');
  console.log(data);

  const [isOnEdit, setIsOnEdit] = useState(false);
  const [newUsername, setNewUsername] = useState<string | null>('');
  const handleUsername = (input: string) => setNewUsername(input);
  const handleSubmitUsername = () => {
    setStorage({ ...data!, username: newUsername });
  };

  if (!data) {
    <ActivityIndicator />;
  }

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <Text className="mr-auto font-main font-extrabold text-3xl text-platinum p-3">
        Profile & Settings
      </Text>
      <View className="flex">
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: data?.avatar,
          }}
          fallback={true}
          onError={() => console.log('FastImage')}
          className="w-36 h-36 mt-10 self-center rounded-full">
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              });
              // launchCamera();
            }}
            className="flex-1 justify-center items-center">
            <AntDesign name="camera" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
        </FastImage>
      </View>
      <View className="flex-row justify-center mt-2 mb-10 items-center">
        <TextInput
          className="text-lg text-ghostWhite mr-2 font-main"
          defaultValue={data?.username!}
          editable={isOnEdit}
          onChangeText={handleUsername}
          onSubmitEditing={handleSubmitUsername}
        />
        <TouchableOpacity
          onPress={() => {
            !isOnEdit ? setIsOnEdit(true) : setIsOnEdit(false);
          }}>
          <AntDesign name="edit" size={20} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        className="flex-row justify-center"
        onPress={() => {
          navigation.navigate('ChangeUserInfo');
        }}>
        <Text className="text-center text-base mb-10 mr-3 text-ghostWhite">Change Information</Text>
        <AntDesign name="edit" size={25} color="#f8f7ffff" />
      </TouchableOpacity> */}
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
        style={{ width: vw * 100 - 50 }}
        onPress={handleSignOut}>
        <Text className="text-ghostWhite text-center font-main text-base">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
