import { View, Text } from 'react-native';
import React from 'react';
import { AnimeById } from '@src/types/animeTypes';
import { formatTime } from '@utils/formatTime';

export default function ScheduleCard({ item }: { item: AnimeById }) {
  const { day, time } = item.broadcast;
  formatTime(day, time);
  return (
    <View>
      {/* {item.broadcast.time} */}
      <Text className="text-platinum">{item.broadcast.time}</Text>
      <Text className="text-platinum font-bold text-2xl">{item.title}</Text>
    </View>
  );
}
