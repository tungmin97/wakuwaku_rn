import React from 'react';
import { View } from 'react-native';
import SkeletonLoaderBig from './SkeletonLoaderBig';

export default function CardFooterLoading({ isFetching }: { isFetching: boolean }) {
  return (
    <>
      {isFetching && (
        <View className="p-1.5">
          <SkeletonLoaderBig />
        </View>
      )}
    </>
  );
}
