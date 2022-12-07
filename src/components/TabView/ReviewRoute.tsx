import { ScrollView, Text } from 'react-native';
import React from 'react';
import { useGetAnimeReviewsQuery } from '@services/api/apiSlice';
import TabViewLoading from '@components/Loading/TabViewLoading';
import { AnimeReviewData } from '@src/types/animeTypes';
import ReviewCard from './ReviewCard';

type Props = {
  id: number;
};

export const ReviewRoute = ({ id }: Props) => {
  const { data, isFetching } = useGetAnimeReviewsQuery(id);

  if (isFetching) {
    return (
      <ScrollView>
        <TabViewLoading num={7} />
      </ScrollView>
    );
  }
  return (
    <ScrollView className="flex-1 bg-black">
      {data?.data.length! < 1 ? (
        <Text className="text-platinum text-center">No review available...</Text>
      ) : (
        data?.data.map((item: AnimeReviewData) => (
          <ReviewCard
            userName={item.user.username}
            date={item.date.slice(0, 10)}
            image={item.user.images.jpg.image_url}
            review={item.review}
            id={item.mal_id}
            key={item.mal_id}
          />
        ))
      )}
    </ScrollView>
  );
};
