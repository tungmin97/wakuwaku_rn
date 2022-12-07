import { TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import HomeModal from '@components/HomeModal/HomeModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNotification } from '@app/hooks/useNotification';
import Clipboard from '@react-native-clipboard/clipboard';
import { useWatchList } from '@src/app/hooks/useWatchList';

interface Props {
  item: AnimeById;
}

const WatchListCard = ({ item }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });
  const { handleRemoveWatchList } = useWatchList();
  const { createReminderNotification } = useNotification();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
    createReminderNotification;
  };

  const shareHandler = () => {
    Clipboard.setString(item.trailer.url);
  };

  const deteleHandler = () => {
    handleRemoveWatchList(item);
  };

  return (
    <>
      <TouchableOpacity className="px-1.5 pb-5 flex-row" onPress={handleModal}>
        <FastImage
          source={{ uri: item.images.jpg.image_url }}
          className="rounded-md w-20 h-28 justify-end bg-white"
        />
        <View className="ml-3 mt-2 w-60">
          <Text className="font-main text-ghostWhite text-lg font-bold" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row">
            {item.year && <Text className="font-main text-platinum text-xs">{item.year}</Text>}
            {item.rating && (
              <Text className="font-main text-platinum text-xs ml-2">
                {item.rating.split(' - ')[0]}
              </Text>
            )}
            {item.episodes && (
              <Text className="font-main text-platinum text-xs ml-2">{item.episodes} Episodes</Text>
            )}
          </View>
          <View className="flex-row justify-between mt-3">
            <TouchableOpacity
              className="flex-col items-center"
              onPress={() => {
                setIsNotify(!isNotify);
              }}>
              {isNotify ? (
                <AntDesign name="check" size={20} color="white" />
              ) : (
                <AntDesign name="bells" size={20} color="white" />
              )}
              <Text className="font-main text-xs text-ghostWhite mt-1">Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center" onPress={deteleHandler}>
              <AntDesign name="delete" size={20} color="white" />
              <Text className="font-main text-xs text-ghostWhite mt-1">Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center" onPress={shareHandler}>
              <AntDesign name="sharealt" size={20} color="white" />
              <Text className="font-main text-xs text-ghostWhite mt-1">Share</Text>
            </TouchableOpacity>
          </View>
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

export default WatchListCard;
