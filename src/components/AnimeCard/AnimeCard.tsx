import { TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { AnimeStackNavigationProps } from 'src/types/types';

const AnimeCard = ({ item }: { item: AnimeById }) => {
  const navigation = useNavigation<AnimeStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('AnimeDetails', { item: item });

  return (
    <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleNavigation}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: item.images.jpg.image_url }}
        className="rounded-md w-44 h-64 justify-end bg-white"
      />
    </TouchableOpacity>
  );
};

export default memo(AnimeCard);
