import { View, Text } from 'react-native';
import React from 'react';
import SkeletonLoaderBig from './SkeletonLoaderBig';

export default function MainLoading() {
  const numOfPlaceholders = [...Array(4)].map((e, i) => i + 1);

  return (
    <View>
      <Text className="mr-auto p-3 font-main font-extrabold text-2xl text-platinum">
        Trending now
      </Text>
      <View className="flex-row px-1">
        {numOfPlaceholders.map((index) => (
          <SkeletonLoaderBig key={index} />
        ))}
      </View>
    </View>
  );
}
