import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import HomeTopAnime from '@components/HomeTopAnime/HomeTopAnime';
import HomeUpcomingAnime from '@components/HomeUpcomingAnime/HomeUpcomingAnime';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true} n>
      <HomeTopAnime />
      <HomeUpcomingAnime />
      <HomeUpcomingAnime />
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
