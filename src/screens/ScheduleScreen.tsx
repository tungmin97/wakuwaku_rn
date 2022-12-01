import { Text, ScrollView } from 'react-native';
import React from 'react';
import ScheduleList from '@components/ScheduleList/ScheduleList';
import { getDate } from '@utils/formatTime';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScheduleScreen() {
  const { today, tomorrow } = getDate();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black p-3">
      <Text className="mr-auto font-main font-extrabold text-3xl text-platinum mb-5">Schedule</Text>
      <ScrollView>
        <ScheduleList date={today} />
        <ScheduleList date={tomorrow} />
      </ScrollView>
    </SafeAreaView>
  );
}
