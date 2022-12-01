import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import HomeTopAnime from '@components/HomeTopAnime/HomeTopAnime';
import HomeUpcomingAnime from '@components/HomeUpcomingAnime/HomeUpcomingAnime';
import HomeSeasonAnime from '@components/HomeSeasonAnime/HomeSeasonAnime';
import HomeJustMissed from '@components/HomeJustMissed/HomeJustMissed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-black">
      <ScrollView className="mb-2">
        <View className="flex-row justify-between items-center px-1">
          <Text className="font-title text-maxRed text-5xl">W</Text>
          <View className="">
            <AntDesign name="search1" size={25} color="#fff" />
          </View>
        </View>
        <HomeTopAnime />
        <HomeSeasonAnime />
        <HomeJustMissed />
        <HomeUpcomingAnime />
      </ScrollView>
    </SafeAreaView>
  );
}
