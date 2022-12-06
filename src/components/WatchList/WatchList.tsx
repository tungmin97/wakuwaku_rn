import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import HomeModal from '@components/HomeModal/HomeModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createReminderNotification } from '../../services/notification/notificationService';
import { formatTime } from '@utils/formatTime';

interface Props {
  item: AnimeById;
}

const WatchList = ({ item }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
    createReminderNotification;
  };
  console.log('333', item);

  const time = item.broadcast.time;
  const day = item.broadcast.day;

  const aringData = formatTime(day, time);
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleModal}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: item.images.jpg.image_url }}
          className="rounded-md w-44 h-64 justify-end bg-white relative"
        />
        <TouchableOpacity
          className="absolute right-2 top-2"
          onPress={() => {
            setIsNotify(!isNotify);
          }}>
          {isNotify ? (
            <AntDesign name="check" size={26} color="white" />
          ) : (
            <AntDesign name="bells" size={26} color="white" />
          )}
        </TouchableOpacity>
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

export default WatchList;
