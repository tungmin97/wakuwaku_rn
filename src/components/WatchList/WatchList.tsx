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
import LinearGradient from 'react-native-linear-gradient';

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

  const time = item.broadcast.time;
  const day = item.broadcast.day;

  const aringData = formatTime(day, time);
  console.log(aringData);
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} className="p-1.5" onPress={handleModal}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: item.images.jpg.image_url }}
          className="rounded-md w-44 h-64 justify-end bg-white relative">
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
            locations={[0, 1]}
            className="absolute top-0 left-0 bottom-0 right-0 bg-transparent">
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
          </LinearGradient>
        </FastImage>
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
