import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

export default function MainLoading() {
  return (
    <View className="">
      <Text className="mr-auto p-3 font-main font-extrabold text-2xl text-platinum">
        Trending now
      </Text>
      <ActivityIndicator color="#fff" />
    </View>
  );
}
