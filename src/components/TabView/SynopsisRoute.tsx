import { Text, ScrollView } from 'react-native';
import React from 'react';

type Props = {
  synopsis: string;
};

export const SynopsisRoute = ({ synopsis }: Props) => (
  <ScrollView className="flex-1 bg-black">
    <Text className="text-ghostWhite font-main mx-5 my-2">{synopsis}</Text>
  </ScrollView>
);
