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
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const [trigger, { data, isFetching, isSuccess }] = useLazyGetTopAnimeQuery();

  useEffect(() => {
    trigger(curPage);
  }, [curPage, trigger]);

  useEffect(() => {
    if (isFetching || isSuccess === false) {
      return;
    }
    // if (isFetching && data?.pagination.current_page === 1) {
    //   setIsFirstLoad(true);
    // }
    if (!data?.pagination.has_next_page) {
      setHasReachedEnd(true);
      return;
    }
    setResults((prev) => [...new Set([...prev, ...data.data])]);
  }, [data?.data, data?.pagination.has_next_page, isFetching, isSuccess]);

  const handleOnScroll = () => {
    setIsScrolling(true);
  };

  const handleOnEndReached = () => {
    isScrolling && setCurPage(curPage + 1);
  };

  const handleRefresh = () => {
    setResults([]);
    // setIsFirstLoad(true);
    trigger(1);
  };

  return (
    <View className="flex-1 justify-center items-center bg-eerieBlack">
      {isSuccess && (
        <>
          <View>
            <Text className="mr-auto p-3 font-main font-extrabold text-2xl text-platinum">
              Trending now
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={results}
              keyExtractor={(item) => String(item.mal_id)}
              renderItem={({ item }) => <AnimeCard item={item} />}
              ListFooterComponent={() => <CardFooterLoading isFetching={isFetching} />}
              onEndReachedThreshold={0.3}
              onEndReached={handleOnEndReached}
              refreshing={false}
              onRefresh={handleRefresh}
              onMomentumScrollBegin={handleOnScroll}
            />
          </View>
        </>
      )}
    </View>
  );
}
