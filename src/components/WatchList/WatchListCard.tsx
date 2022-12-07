import { TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import { AnimeById } from '@src/types/animeTypes';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import HomeModal from '@components/HomeModal/HomeModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNotification } from '@app/hooks/useNotification';
import { useWatchList } from '@app/hooks/useWatchList';
import { formatTimer } from '@utils/formatTimer';
import { useToggleWatchList } from '@app/hooks/useToggleWatchList';
import { TriggerNotification } from '@notifee/react-native';
import { useMMKVObject } from 'react-native-mmkv';
import Share from 'react-native-share';

type Props = {
  item: AnimeById;
};

const WatchListCard = ({ item }: Props) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const handleNavigation = () => navigation.navigate('Details', { item: item });
  const { handleRemoveWatchList } = useWatchList();
  const { isOnNotification, toggleNotification } = useToggleWatchList(item);
  const { createReminderNotification, deleteNotifications } = useNotification();
  const [isModalVisible, setModalVisible] = useState(false);
  const [notif] = useMMKVObject<TriggerNotification[]>('notifications');
  const { time, day } = item.broadcast;
  const airedTime = formatTimer({ day, time });
  const targetNotif = notif?.find((entry) => +entry.notification.data?.id! === item.mal_id);
  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSharing = async () => {
    const options = {
      title: 'My new jam!!!',
      url: item.trailer.url,
    };
    await Share.open(options);
  };

  const deteleHandler = () => {
    handleRemoveWatchList(item);
  };

  const handleNotification = () => {
    const data = {
      id: item.mal_id,
      name: item.title,
      time: airedTime,
    };
    if (!isOnNotification) {
      createReminderNotification(data);
      toggleNotification();
    } else {
      deleteNotifications(targetNotif?.notification.id!);
      toggleNotification();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleModal} className="px-1.5 pb-3 flex-row">
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
          <View className="flex-row justify-around mt-3">
            {airedTime > 0 && (
              <TouchableOpacity className="flex-col items-center" onPress={handleNotification}>
                {isOnNotification ? (
                  <AntDesign name="check" size={20} color="white" />
                ) : (
                  <AntDesign name="bells" size={20} color="white" />
                )}
                <Text className="font-main text-xs text-ghostWhite mt-1">Notification</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity className="flex-col items-center" onPress={deteleHandler}>
              <AntDesign name="delete" size={20} color="white" />
              <Text className="font-main text-xs text-ghostWhite mt-1">Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center" onPress={handleSharing}>
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
