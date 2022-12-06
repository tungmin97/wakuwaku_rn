import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import WatchList from '@components/WatchList/WatchList';
import { RootStackProps } from '@src/types/types';
import { useWatchList } from '@app/hooks/useWatchList';

export default function WatchlistScreen({ navigation }: RootStackProps) {
  const { watchList } = useWatchList();
  const handleNavigation = () => navigation.navigate('Search');

  if (watchList.animeList.length < 1) {
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
          <Text className="text-ghostWhite text-2xl ml-5 font-bold">My List</Text>
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <View className="flex items-center mt-1 mr-2 font-bold">
            <AntDesign name="search1" size={25} color="#f8f7ffff" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="m-2 mt-3 flex-1">
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          scrollEventThrottle={300}
          // eslint-disable-next-line dot-notation
          data={watchList['animeList']}
          keyExtractor={(item) => String(item.mal_id)}
          renderItem={({ item }) => <WatchList item={item} />}
          onEndReachedThreshold={0.3}
          className="h-96"
        />
      </View>
    </SafeAreaView>
  );
}
