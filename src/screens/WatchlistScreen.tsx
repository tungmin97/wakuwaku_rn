import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
// import FastImage from 'react-native-fast-image';
import { useLazyGetUpcomingAnimeQuery } from '@services/api/apiSlice';
// import { AnimeById } from 'src/types/animeTypes';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import { useAnimeQuery } from '@app/hooks/useAnimeQuery';
import NormalLoading from '../components/Loading/NormalLoading';

export default function WatchlistScreen() {
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetUpcomingAnimeQuery();
  const Props = { data, trigger, isFetching, isSuccess, originalArgs };
  const { results, handleOnEndReached, handleRefresh, isFirstLoad } = useAnimeQuery(Props);
  if (isFirstLoad) {
    return <NormalLoading num={4} />;
  }
  // const [textInput] = useState('');
  //   const { data, isFetching } = useGetTopAnimeQuery(1);
  // const { data } = useGetAnimeSearchQuery(textInput);
  // const WatchList = ({ item }: { item: AnimeById }) => {
  //   return (
  //     <View className="bg-gray flex-row items-center p-1">
  //       <View className="w-1/3">
  //         <FastImage className="w-32 h-16 rounded-md" source={{ uri: item.images.jpg.image_url }} />
  //       </View>
  //     </View>
  //   );
  // };
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
