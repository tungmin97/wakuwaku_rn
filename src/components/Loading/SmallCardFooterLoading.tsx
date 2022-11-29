import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function SmallCardFooterLoading({ isFetching }: { isFetching: boolean }) {
  return (
    <>
      {isFetching && (
        <View className="w-14 h-44 justify-center items-center">
          <ActivityIndicator color="#fff" />
        </View>
      )}
    </>
  );
}
