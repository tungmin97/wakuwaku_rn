import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AnimeById } from 'src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackNavigationProps } from '@src/types/types';
import HomeModal from '@components/HomeModal/HomeModal';
import { useNavigation } from '@react-navigation/native';

const SearchItemCard = ({ item }: { item: AnimeById }) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });

  const [isModalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity className="bg-gray flex-row items-center p-1" onPress={handleModal}>
        <View className="w-1/3">
          <FastImage className="w-32 h-16 rounded-md" source={{ uri: item.images.jpg.image_url }} />
        </View>
        <View className="flex-1 ml-3 mr-2 flex-row justify-between">
          <View className="w-3/4">
            <Text className="text-ghostWhite font-main">{item.title}</Text>
          </View>
          <TouchableOpacity onPress={handleModal}>
            <AntDesign className="mr-2" name="play" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
        </View>
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

export default SearchItemCard;
