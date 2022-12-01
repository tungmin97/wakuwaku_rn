import { View, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import { useLazyGetSeasonalAnimeQuery } from '@services/api/apiSlice';
import MainLoading from '@components/Loading/MainLoading';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import CardFooterLoading from '@components/Loading/CardFooterLoading';

export default function HomeSeasonAnime() {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetSeasonalAnimeQuery();

  useEffect(() => {
    trigger(curPage);
  }, [curPage, trigger]);

  useEffect(() => {
    if (isFetching || isSuccess === false) {
      return;
    }
    if (isFetching && originalArgs === 1) {
      setIsFirstLoad(true);
    } else {
      setIsFirstLoad(false);
    }
    if (!data?.pagination.has_next_page) {
      setHasReachedEnd(true);
      return;
    }
    setResults((prev) => [
      ...new Set(
        [...prev, ...data.data].filter(
          (item) => item.rating !== 'R+ - Mild Nudity' || 'Rx - Hentai' || 'PG - Children',
        ),
      ),
    ]);
  }, [data, isFetching, isSuccess, originalArgs]);

  const handleOnEndReached = () => {
    if (!hasReachedEnd) {
      setCurPage(curPage + 1);
    }
  };

  const handleRefresh = () => {
    setIsFirstLoad(true);
    setHasReachedEnd(false);
    setResults([]);
    trigger(1);
  };

  if (isFirstLoad) {
    return <MainLoading />;
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
              ListFooterComponent={() => <CardFooterLoading isFetching={isFetching} />}
              onEndReachedThreshold={0.3}
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
