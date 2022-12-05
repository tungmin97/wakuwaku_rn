import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HomeTopAnime from '@components/HomeTopAnime/HomeTopAnime';
import HomeUpcomingAnime from '@components/HomeUpcomingAnime/HomeUpcomingAnime';
import HomeSeasonAnime from '@components/HomeSeasonAnime/HomeSeasonAnime';
import HomeJustMissed from '@components/HomeJustMissed/HomeJustMissed';
import HomeAnimeByGenres from '@components/HomeAnimeByGenres/HomeAnimeByGenres';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-black">
      <ScrollView className="mb-2">
        <View className="flex-row justify-between items-center p-2 mx-2">
          <Text className="font-title text-maxRed text-5xl">W</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <AntDesign name="search1" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <HomeTopAnime />
        <HomeSeasonAnime />
        <HomeJustMissed />
        <HomeUpcomingAnime />
        <HomeAnimeByGenres name="Action" />
        <HomeAnimeByGenres name="Comedy" />
        <HomeAnimeByGenres name="Romance" />
      </ScrollView>
    </SafeAreaView>
  );
}
