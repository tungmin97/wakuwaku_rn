import React from 'react';
import { View } from 'react-native';
import SkeletonLoader from './SkeletonLoader';

export default function SmallCardFooterLoading({ isFetching }: { isFetching: boolean }) {
  return (
    <>
      {isFetching && (
        <View className="p-1.5">
          <SkeletonLoader />
        </View>
      )}
    </>
  );
}
