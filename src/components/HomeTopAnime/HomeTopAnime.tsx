import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { useLazyGetTopAnimeQuery } from '@services/api/apiSlice';
import MainLoading from '@components/Loading/MainLoading';
import AnimeCard from '@components/AnimeCard/AnimeCard';
import CardFooterLoading from '@components/Loading/CardFooterLoading';
import { useAnimeQuery } from '@app/hooks/useAnimeQuery';

export default function HomeTopAnime() {
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetTopAnimeQuery();
  const Props = { data, trigger, isFetching, isSuccess, originalArgs };
  const { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll } =
    useAnimeQuery(Props);

  if (isFirstLoad) {
    return <MainLoading />;
  }
  return (
    <View className="flex-1 w-full justify-center items-center bg-black">
      {isSuccess && (
        <View>
          <Text className="mr-auto p-3 pb-0 font-main font-extrabold text-2xl text-platinum">
            Top Series
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            scrollEventThrottle={300}
            data={results}
            keyExtractor={(item) => String(item.mal_id)}
            renderItem={({ item }) => <AnimeCard item={item} />}
            ListFooterComponent={() => <CardFooterLoading isFetching={isFetching} />}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={handleScroll}
            onEndReached={handleOnEndReached}
            refreshing={false}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
}
