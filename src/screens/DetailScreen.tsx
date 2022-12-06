import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import AnimeDetailTabView from '@src/components/TabView/AnimeDetailTabView';
import { AnimeById } from 'src/types/animeTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchList } from '@app/hooks/useWatchList';
import { DetailScreenProps } from 'src/types/types';

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const dimensionForScreen = Dimensions.get('screen');
  const { item } = route.params;
  const { handleAddWatchList, getWatchList } = useWatchList(item);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between m-4">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <AntDesign name="search1" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <YoutubeIframe
          height={220}
          width={dimensionForScreen.width}
          videoId={item.trailer.youtube_id}
        />
        <View className="mx-5">
          <Text className=" text-ghostWhite mt-5 font-main text-2xl font-bold font-main">
            {item.title}
          </Text>
          <View className="flex-row my-2">
            <Text className="text-platinum text-[10px] font-main">{item.year}</Text>
            <Text className="text-platinum mx-2 text-[10px] font-main">
              {item.rating.slice(3, 8)}
            </Text>
            <Text className="text-platinum text-[10px] font-main">{item.episodes} Episodes</Text>
          </View>
        </View>

        <View className="flex-row justify-around items-center my-5">
          <TouchableOpacity className="flex-col items-center" onPress={handleAddWatchList}>
            <AntDesign name="plus" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-2 font-main">My list</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Text className="text-ghostWhite font-main text-lg">{item.score}</Text>
            <Text className=" text-ghostWhite text-[13px] font-main">Score</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <AntDesign name="sharealt" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-2 font-main">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AnimeDetailTabView synopsis={item.synopsis} id={item.mal_id} />
    </SafeAreaView>
  );
}
