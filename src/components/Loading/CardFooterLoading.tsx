import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

export default function CardFooterLoading({ isFetching }: { isFetching: boolean }) {
  return <>{isFetching && <ActivityIndicator />}</>;
}
