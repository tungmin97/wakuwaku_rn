import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AnimeById } from '@src/types/animeTypes';
import { formatTime } from '@utils/formatTime';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'src/types/types';

export default function ScheduleCard({ item }: { item: AnimeById }) {
  const navigation = useNavigation<RootStackNavigationProps>();
  const { day, time } = item.broadcast;
  const airingData = formatTime(day, time);
  const handleNavigation = () => navigation.navigate('Details', { item: item });

  return (
    <TouchableOpacity onPress={handleNavigation} className="pb-5">
      <Text className="text-white font-bold text-2xl">{item.title}</Text>
      <Text className="text-ghostWhite mb-1">{airingData}</Text>
      <View className="flex-row items-center gap-2 mb-1">
        {item.score ? (
          <>
            <Feather name={item.score > 6 ? 'smile' : 'frown'} size={15} color="#fff" />
            <Text className="text-platinum text-xs">{item.score}</Text>
          </>
        ) : (
          <>
            <Feather name="meh" size={15} color="#fff" />
            <Text className="text-platinum text-xs">N/A</Text>
          </>
        )}
      </View>
      <Text className="text-darkGray text-xs capitalize">Source • {item.source}</Text>
    </TouchableOpacity>
  );
}
