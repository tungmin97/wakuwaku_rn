import { Text, ScrollView } from 'react-native';
import React from 'react';
import { useGetAnimeVideosEpisodesQuery } from '@services/api/apiSlice';
import TabViewLoading from '@components/Loading/TabViewLoading';
import EspisodeCard from './EspisodeCard';
import { AnimeEspisode } from '@src/types/animeTypes';

type Props = {
  id: number;
};
export const EpisodesRoute = ({ id }: Props) => {
  const { data, isFetching } = useGetAnimeVideosEpisodesQuery(id);

  if (isFetching) {
    return (
      <ScrollView>
        <TabViewLoading num={7} />
      </ScrollView>
    );
  }
  return (
    <ScrollView className="flex-1 bg-black">
      {data?.data && data?.data.length! < 1 ? (
        <Text className="text-platinum text-center">No episodes available...</Text>
      ) : (
        data?.data?.map((item: AnimeEspisode) => (
          <EspisodeCard
            img={item?.images?.jpg.image_url}
            espisode={item?.mal_id}
            title={item?.title}
            id={item?.mal_id}
            key={item.mal_id}
            url={item?.url}
          />
        ))
      )}
    </ScrollView>
  );
};
