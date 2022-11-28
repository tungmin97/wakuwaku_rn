import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeTopAnime from '@components/HomeTopAnime/HomeTopAnime';
import HomeUpcomingAnime from '@components/HomeUpcomingAnime/HomeUpcomingAnime';
import HomeSeasonAnime from '@components/HomeSeasonAnime/HomeSeasonAnime';
import HomeJustMissed from '@components/HomeJustMissed/HomeJustMissed';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="flex-row w-full p-3 pb-0 mt-10 justify-between items-center">
        <Text className="font-title text-maxRed text-5xl">W</Text>
        <AntDesign name="search1" size={25} color="#fff" />
      </View>
      <HomeTopAnime />
      <HomeSeasonAnime />
      <HomeJustMissed />
      <HomeUpcomingAnime />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
