import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import { useLazyGetTopAnimeQuery } from '@services/api/apiSlice';
import MainLoading from '@components/Loading/MainLoading';
import AnimeCard from '@components/AnimeCard/AnimeCard';
import CardFooterLoading from '@components/Loading/CardFooterLoading';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HomeScreen() {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(true);

  const [trigger, { data, isFetching, isSuccess }] = useLazyGetTopAnimeQuery();

  useEffect(() => {
    trigger(curPage);
  }, [curPage, trigger]);

  useEffect(() => {
    if (isFetching || isSuccess === false) {
      return;
    }
    if (!data?.pagination.has_next_page) {
      setShouldLoad(false);
      return;
    }
    setResults((prev) => [...new Set(prev.concat(...data.data))]);
  }, [data?.data, data?.pagination.has_next_page, isFetching, isSuccess]);

  const handleOnScroll = () => {
    setIsScrolling(true);
  };

  const handleOnEndReached = () => {
    isScrolling && setCurPage(curPage + 1);
  };

  const handleRefresh = () => {
    setResults([]);
    setShouldLoad(true);
    setCurPage(1);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <AntDesign name="forward" size={20} />
      {isFetching && <MainLoading />}
      {isSuccess && (
        <>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={results}
            keyExtractor={(item) => String(item.mal_id)}
            renderItem={({ item }) => <AnimeCard item={item} />}
            ListFooterComponent={() => <CardFooterLoading shouldLoad={shouldLoad} />}
            onEndReachedThreshold={0.3}
            onEndReached={handleOnEndReached}
            refreshing={false}
            onRefresh={handleRefresh}
            onMomentumScrollBegin={handleOnScroll}
          />
        </>
      )}
    </View>
  );
}
