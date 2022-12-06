import { Text, View } from 'react-native';
import React from 'react';
import { useGetAnimeScheduleQuery } from '@services/api/apiSlice';
import { toUnix } from '@utils/formatTime';
import ScheduleCard from '@components/ScheduleCard/ScheduleCard';
import SkeletonListLoader from '../Loading/SkeletonListLoader';

interface Props {
  date: string;
}
export default function ScheduleList({ date }: Props) {
  const { data } = useGetAnimeScheduleQuery(date);

  if (!data) {
    return <SkeletonListLoader />;
  }

  const sortedSchedule = [...data.data]
    .sort((a, b) => toUnix(a.broadcast.time) - toUnix(b.broadcast.time))
    .filter((item) => item.broadcast.time && item.broadcast.day);
  return (
    <View className="flex-row p-2 pb-5">
      <Text className="font-extrabold font-main text-2xl text-platinum w-1/5">
        {date.slice(0, 3)}
      </Text>
      <View className="w-5/6">
        {sortedSchedule.map((item) => (
          <ScheduleCard key={item.mal_id} item={item} />
        ))}
      </View>
    </View>
  );
}
