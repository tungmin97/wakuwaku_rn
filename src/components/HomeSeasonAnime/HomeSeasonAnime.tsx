import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { useLazyGetSeasonalAnimeQuery } from '@services/api/apiSlice';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import NormalLoading from '../Loading/NormalLoading';
import SmallCardFooterLoading from '../Loading/SmallCardFooterLoading';
import { useAnimeQuery } from '@app/hooks/useAnimeQuery';

export default function HomeSeasonAnime() {
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetSeasonalAnimeQuery();
  const Props = { data, trigger, isFetching, isSuccess, originalArgs };
  const { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll } =
    useAnimeQuery(Props);

  if (isFirstLoad) {
    return <NormalLoading num={4} />;
  }

  return (
    <View className="flex-1 h-60 justify-center items-center bg-black">
      {isSuccess && (
        <>
          <View>
            <Text className="mr-auto p-3 pb-0 font-main font-extrabold text-2xl text-platinum">
              This Season
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
              onEndReachedThreshold={0.3}
              onMomentumScrollBegin={handleScroll}
              onEndReached={handleOnEndReached}
              refreshing={false}
              onRefresh={handleRefresh}
              className="h-64"
            />
          </View>
        </>
      )}
    </View>
  );
}
