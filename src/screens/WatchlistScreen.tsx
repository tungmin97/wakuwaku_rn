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
        <View className="flex-row justify-between mx-4">
          <View className="flex-row items-center">
            <TouchableOpacity>
              <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
            </TouchableOpacity>
            <Text className="text-ghostWhite text-2xl ml-5 font-bold">My List</Text>
          </View>
          <TouchableOpacity>
            <View className="flex items-center">
              <AntDesign name="search1" size={25} color="#f8f7ffff" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="m-2 mt-3">
          <FlatList
            ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
            data={anime}
            initialNumToRender={3}
            horizontal={true}
            keyExtractor={(item) => String(item.mal_id)}
            renderItem={({ item }) => <SmallAnimeCard item={item} />}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            refreshing={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
