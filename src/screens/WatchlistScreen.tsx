import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import WatchListCard from '@src/components/WatchList/WatchListCard';
import { RootStackProps } from '@src/types/types';
import { useWatchList } from '@app/hooks/useWatchList';

export default function WatchlistScreen({ navigation }: RootStackProps) {
  const { watchList } = useWatchList();
  const handleNavigation = () => navigation.navigate('Search');

  if (!watchList) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row justify-between mx-4">
          <View className="flex-row items-center">
            <Text className="text-ghostWhite text-2xl ml-5 font-bold">My List</Text>
          </View>
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }
  if (watchList?.animeList.length < 1) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row justify-between mx-4">
          <View className="flex-row items-center">
            <Text className="text-ghostWhite text-2xl ml-5 font-bold">My List</Text>
          </View>
          <TouchableOpacity onPress={handleNavigation}>
            <View className="flex items-center mt-1 mr-2 font-bold">
              <AntDesign name="search1" size={25} color="#f8f7ffff" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-platinum">You haven't added any show yet...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between mx-4">
        <View className="flex-row items-center">
          <Text className="mr-auto font-main font-extrabold text-3xl text-platinum mb-5 pt-3">
            My list
          </Text>
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <View className="flex items-center mt-1 mr-2 font-bold pt-3">
            <AntDesign name="search1" size={25} color="#f8f7ffff" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="m-2 mt-3 flex-1">
        <FlatList
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          scrollEventThrottle={300}
          // eslint-disable-next-line dot-notation
          data={watchList['animeList']}
          keyExtractor={(item) => String(item.mal_id)}
          renderItem={({ item }) => <WatchListCard item={item} />}
          onEndReachedThreshold={0.3}
          className="h-96"
        />
      </View>
    </SafeAreaView>
  );
}
