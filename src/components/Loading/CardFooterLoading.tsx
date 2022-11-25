import { View, Text } from 'react-native';
import React from 'react';

export default function CardFooterLoading({ shouldLoad }: { shouldLoad: boolean }) {
  return (
    <>
      {!shouldLoad && (
        <View>
          <Text>CardFooterLoading</Text>
        </View>
      )}
    </>
  );
}
