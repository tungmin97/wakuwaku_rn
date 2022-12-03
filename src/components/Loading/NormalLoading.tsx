import { View, Text } from 'react-native';
import React from 'react';
import SkeletonLoader from './SkeletonLoader';

interface Props {
  num: number;
}

export default function NormalLoading({ num }: Props) {
  const numOfPlaceholders = [...Array(num)].map((e, i) => i + 1);

  return (
    <View>
      <Text className="mr-auto p-3 font-main font-extrabold text-2xl text-platinum">
        Trending now
      </Text>
      <View className="flex-row px-1">
        {numOfPlaceholders.map((index) => (
          <SkeletonLoader key={index} />
        ))}
      </View>
    </View>
  );
}
