import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { AnimeById } from 'src/types/animeTypes';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

interface Props {
  visible: boolean;
  item: AnimeById;
  handleNavigation: () => void;
  handleModal: () => void;
}

export default function HomeModal({ visible, item, handleNavigation, handleModal }: Props) {
  return (
    <>
      <Modal
        isVisible={visible}
        useNativeDriver={true}
        backdropOpacity={0.4}
        onBackdropPress={handleModal}
        onBackButtonPress={handleModal}
        className="m-0">
        <View className="basis-1/3 bg-dark mt-auto rounded-t-2xl p-3 justify-between">
          <View className="flex-row">
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.images.jpg.image_url }}
              className="rounded-md w-28 h-40 justify-end bg-white"
            />
            <View className="ml-4 w-2/3">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-ghostWhite font-bold text-xl">{item.title}</Text>
                <TouchableOpacity
                  onPress={handleModal}
                  className="h-7 rounded-full border border-darkGray bg-darkGray">
                  <Entypo name="cross" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
              <View className="flex-row mb-1 gap-3">
                <Text className="text-platinum text-xs">{item.year}</Text>
                <Text className="text-platinum text-xs">{item.rating.split(' - ')[0]}</Text>
                {item.episodes !== null && (
                  <Text className="text-platinum text-xs">{item.episodes} Episodes</Text>
                )}
              </View>
              <Text numberOfLines={4} className="text-platinum">
                {item.synopsis}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleNavigation}
            className="flex-row justify-between items-center p-3 pb-1 border-t border-ghostWhite">
            <View className="flex-row items-center gap-2">
              <View className="border-2 border-ghostWhite rounded-full">
                <Ionicons name="information" size={15} color="#fff" />
              </View>
              <Text className="text-ghostWhite text-base">Episode & Info</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" sie={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
