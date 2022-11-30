import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import React from 'react';
import { useGetAnimeScheduleQuery } from '@services/api/apiSlice';
import { toUnix } from '@utils/formatTime';
import ScheduleCard from '@components/ScheduleCard/ScheduleCard';

interface Props {
  date: string;
}
export default function ScheduleList({ date }: Props) {
  const { data } = useGetAnimeScheduleQuery(date);

  if (!data) {
    return <ActivityIndicator />;
  }

  const sortedSchedule = [...data.data]
    .sort((a, b) => toUnix(a.broadcast.time) - toUnix(b.broadcast.time))
    .filter((item) => item.broadcast.time && item.broadcast.day);
  return (
    <View className="flex-row gap-3 pb-5">
      <Text className="font-bold text-2xl text-platinum">{date.slice(0, 3)}</Text>
      <View>
        {sortedSchedule.map((item) => (
          <ScheduleCard key={item.mal_id} item={item} />
        ))}
      </View>
    </View>
  );
}
