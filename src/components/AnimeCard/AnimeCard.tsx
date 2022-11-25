import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';

export default function AnimeCard({ item }: { item: AnimeById }) {
  return (
    <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={() => console.log('e')}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: item.images.jpg.image_url }}
        className="rounded-md w-44 h-72 justify-end"
      />
    </TouchableOpacity>
  );
}
