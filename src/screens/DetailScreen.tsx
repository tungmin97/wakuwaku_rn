import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';
import AnimeDetailTabView from '@src/components/TabView/AnimeDetailTabView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchList } from '@app/hooks/useWatchList';
import { DetailScreenProps } from '@src/types/types';
import { useViewportUnits } from '@app/hooks/main';

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const { vw } = useViewportUnits();
  const { item } = route.params;
  const { handleAddWatchList, handleRemoveWatchList } = useWatchList();
  const handleGoBack = () => navigation.goBack();
  const handleNavigation = () => navigation.navigate('Search');

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between m-4">
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigation}>
          <AntDesign name="search1" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <YoutubeIframe height={220} width={vw * 100} videoId={item.trailer.youtube_id} />
        <View className="mx-5">
          <Text className=" text-ghostWhite mt-5 text-2xl font-bold font-main">{item.title}</Text>
          <View className="flex-row my-2">
            {item.year !== null && (
              <Text className="text-platinum text-xs font-main">{item.year}</Text>
            )}
            {item.rating !== null && (
              <Text className="text-platinum mx-2 text-xs font-main">
                {item.rating.split(' - ')[0]}
              </Text>
            )}
            {item.episodes !== null && (
              <Text className="text-platinum text-[10px] font-main">{item.episodes} Episodes</Text>
            )}
          </View>
        </View>
        <View className="flex-row justify-around items-center my-5">
          <TouchableOpacity
            className="flex-col items-center"
            onPress={() => handleAddWatchList(item)}>
            <AntDesign name="plus" size={22} color="white" />
            <Text className=" text-ghostWhite text-[13px] mt-2 font-main">My list</Text>
          </TouchableOpacity>
          {item.score && (
            <TouchableOpacity className="flex-col items-center">
              <Text className="text-ghostWhite font-main text-lg">{item.score}</Text>
              <Text className=" text-ghostWhite text-[13px] font-main">Score</Text>
            </TouchableOpacity>
          )}
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
