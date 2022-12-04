import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { useLazyGetUpcomingAnimeQuery } from '@services/api/apiSlice';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import SmallCardFooterLoading from '@components/Loading/SmallCardFooterLoading';
import NormalLoading from '@components/Loading/NormalLoading';
import { useAnimeQuery } from '@app/hooks/useAnimeQuery';

export default function HomeUpcomingAnime() {
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetUpcomingAnimeQuery();
  const Props = { data, trigger, isFetching, isSuccess, originalArgs };
  const { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll } =
    useAnimeQuery(Props);

  if (isFirstLoad) {
    return <NormalLoading num={4} />;
  }

  return (
    <View className="flex-1 h-60 justify-center items-center bg-black">
      {isSuccess && (
        <View>
          <Text className="mr-auto p-3 pb-0 font-main font-extrabold text-2xl text-platinum">
            Upcoming
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            scrollEventThrottle={300}
            data={results}
            keyExtractor={(item) => String(item.mal_id)}
            renderItem={({ item }) => <SmallAnimeCard item={item} />}
            ListFooterComponent={() => <SmallCardFooterLoading isFetching={isFetching} />}
            onMomentumScrollBegin={handleScroll}
            onEndReachedThreshold={0.5}
            onEndReached={handleOnEndReached}
            refreshing={false}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
}
