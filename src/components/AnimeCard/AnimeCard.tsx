import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import HomeModal from '@components/HomeModal/HomeModal';

type Props = {
  item: AnimeById;
};

const AnimeCard = ({ item }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });
  const [isModalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleModal}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: item.images.jpg.image_url }}
          className="rounded-md w-44 h-64 justify-end bg-white"
        />
      </TouchableOpacity>
      <HomeModal
        visible={isModalVisible}
        item={item}
        handleNavigation={handleNavigation}
        handleModal={handleModal}
      />
    </>
  );
};

export default AnimeCard;
