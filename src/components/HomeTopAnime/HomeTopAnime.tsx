import { View, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import { useLazyGetTopAnimeQuery } from '@services/api/apiSlice';
import MainLoading from '@components/Loading/MainLoading';
import AnimeCard from '@components/AnimeCard/AnimeCard';
import CardFooterLoading from '@components/Loading/CardFooterLoading';

export default function HomeTopAnime() {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetTopAnimeQuery();

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
    setResults((prev) => [...new Set([...prev, ...data.data])]);
  }, [data, isFetching, isSuccess, originalArgs]);

  const handleOnEndReached = () => {
    if (!hasReachedEnd) {
      console.log('Fetching more data...');
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
            onEndReached={handleOnEndReached}
            refreshing={false}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
}
