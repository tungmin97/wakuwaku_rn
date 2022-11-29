import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useGetAnimeScheduleQuery } from '@services/api/apiSlice';

export default function ScheduleScreen() {
  const { data } = useGetAnimeScheduleQuery('monday');
  console.log(data);
  return (
    <View>
      <Text>ScheduleScreen</Text>
      <FlatList
        data={data.data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
