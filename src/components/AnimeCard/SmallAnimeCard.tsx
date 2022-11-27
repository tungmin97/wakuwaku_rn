import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { AnimeStackNavigationProps } from 'src/types/types';

export default function SmallAnimeCard({ item }: { item: AnimeById }) {
  const navigation = useNavigation<AnimeStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('AnimeDetails', { item: item });

  return (
    <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleNavigation}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: item.images.jpg.image_url }}
        className="rounded-md w-32 h-44 justify-end"
      />
    </TouchableOpacity>
  );
}
