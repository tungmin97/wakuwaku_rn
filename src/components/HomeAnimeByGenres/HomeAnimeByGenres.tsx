import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { useLazyGetAnimeByGenresQuery } from '@services/api/apiSlice';
import MainLoading from '@components/Loading/MainLoading';
import SmallAnimeCard from '@components/AnimeCard/SmallAnimeCard';
import CardFooterLoading from '@components/Loading/CardFooterLoading';
import { useAnimeGenreQuery } from '@app/hooks/useAnimeGenreQuery';
import { genresDict } from '@src/utils/genresDictionary';

interface Props {
  name: string;
}

export default function HomeAnimeByGenres({ name }: Props) {
  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetAnimeByGenresQuery();
  const genre = genresDict[name];
  const Props = { data, trigger, isFetching, isSuccess, originalArgs, genre };
  const { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll } =
    useAnimeGenreQuery(Props);

  if (isFirstLoad) {
    return <MainLoading />;
  }

  return (
    <View className="flex-1 h-60 justify-center items-center bg-black">
      {isSuccess && (
        <>
          <View>
            <Text className="mr-auto p-3 pb-0 font-main font-extrabold text-2xl text-ghostWhite">
              {name}
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
