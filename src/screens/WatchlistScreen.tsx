import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
// import FastImage from 'react-native-fast-image';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import { ActivityIndicator } from 'react-native';
import { useWatchList } from '@app/hooks/useWatchList';
import { useNavigation } from '@react-navigation/native';
import { AnimeById } from 'src/types/animeTypes';

export default function WatchlistScreen({ route }) {
  const dimensionForScreen = Dimensions.get('screen');
  const navigation = useNavigation();

  const item: AnimeById = route.params.item;
  const [loading, setLoading] = useState(true);
  const { handleAddWatchList, watchList } = useWatchList(item);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        <View className="flex-row justify-between p-3">
          <Text className="mr-auto font-main font-extrabold text-3xl text-platinum">My List</Text>
          <View className="flex items-center">
            <AntDesign name="search1" size={25} color="#f8f7ffff" />
          </View>
        </View>
        {isSuccess && (
          <View className="m-2">
            <FlatList
              ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
              data={results}
              initialNumToRender={3}
              horizontal={true}
              keyExtractor={(item) => String(item.mal_id)}
              renderItem={({ item }) => <SmallAnimeCard item={item} />}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              onEndReached={handleOnEndReached}
              refreshing={false}
              onRefresh={handleRefresh}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
