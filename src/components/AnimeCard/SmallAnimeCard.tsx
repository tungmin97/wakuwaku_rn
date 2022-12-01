import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'src/types/types';

interface Props {
  item: AnimeById;
}

const SmallAnimeCard = ({ item }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });

  return (
    <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleNavigation}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: item.images.jpg.image_url,
        }}
        className="rounded-md w-32 h-44 justify-end"
      />
    </TouchableOpacity>
  );
};

export default SmallAnimeCard;
