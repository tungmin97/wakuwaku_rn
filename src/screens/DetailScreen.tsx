import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import AnimeDetailTabView from '@src/components/TabView/AnimeDetailTabView';
import { AnimeById } from 'src/types/animeTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '@react-native-firebase/auth';
import { DetailScreenProps } from 'src/types/types';

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const dimensionForScreen = Dimensions.get('screen');

  const { item } = route.params;

  if (firebase.auth().currentUser !== null) console.log(firebase.auth().currentUser?.uid);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between m-4">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <AntDesign name="search1" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <YoutubeIframe
          height={220}
          width={dimensionForScreen.width}
          videoId={item.trailer.youtube_id}
        />
        <View className="mx-5">
          <Text className=" text-ghostWhite mt-5 font-main text-2xl font-bold">{item.title}</Text>
          <View className="flex-row my-2">
            <Text className="text-platinum text-[10px]">{item.year}</Text>
            <Text className="text-platinum mx-2 text-[10px]">{item.rating.slice(3, 8)}</Text>
            <Text className="text-platinum text-[10px]">{item.episodes} Episodes</Text>
          </View>
        </View>

        <View className="flex-row justify-around items-center my-5">
          <TouchableOpacity className="flex-col items-center">
            <AntDesign name="plus" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-1">My list</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <AntDesign name="like2" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-1">Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <AntDesign name="sharealt" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-1">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AnimeDetailTabView synopsis={item.synopsis} id={item.mal_id} />
    </SafeAreaView>
  );
}
