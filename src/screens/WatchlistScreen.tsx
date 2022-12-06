import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLazyGetSeasonalAnimeQuery } from '@services/api/apiSlice';
import WatchList from '@components/WatchList/WatchList';
import NormalLoading from '../components/Loading/NormalLoading';
import SmallCardFooterLoading from '../components/Loading/SmallCardFooterLoading';
import { useAnimeQuery } from '@app/hooks/useAnimeQuery';
import { useNavigation } from '@react-navigation/native';

export default function WatchlistScreen() {
  const navigation = useNavigation();
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetSeasonalAnimeQuery();
  const Props = { data, trigger, isFetching, isSuccess, originalArgs };
  const { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll } =
    useAnimeQuery(Props);
  if (isFirstLoad) {
    return <NormalLoading num={4} />;
  }
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between mx-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
          <Text className="text-ghostWhite text-2xl ml-5 font-bold">My List</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
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
          data={results}
          keyExtractor={(item) => String(item.mal_id)}
          renderItem={({ item }) => <WatchList item={item} />}
          ListFooterComponent={() => <SmallCardFooterLoading isFetching={isFetching} />}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={handleScroll}
          onEndReached={handleOnEndReached}
          refreshing={false}
          onRefresh={handleRefresh}
          className="h-96"
        />
      </View>
    </SafeAreaView>
  );
}
