import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackProps } from '@src/types/types';
import { useNotification } from '@app/hooks/useNotification';
import { useMMKVObject } from 'react-native-mmkv';
import { TriggerNotification } from '@notifee/react-native';

const NotificationScreen = ({ navigation }: RootStackProps) => {
  const { getAllReminderNotifications, deleteNotifications, clearAllNotifications } =
    useNotification();
  const handleNavigation = () => navigation.goBack();
  const [data, setData] = useMMKVObject<TriggerNotification[]>('notifications');
  getAllReminderNotifications().then((notif) => setData(notif));
  const handleRemoveNotif = async (id: string) => {
    await deleteNotifications(id);
    handleNavigation();
  };
  const handleClearNotif = async () => {
    await clearAllNotifications();
    handleNavigation();
  };

  return (
    <SafeAreaView className="bg-black flex-1 p-3">
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={handleNavigation} className="ml-2">
          <AntDesign name="left" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
        <View className="flex-row flex-1 items-end">
          <Text className="ml-auto mr-2 font-main font-extrabold text-3xl text-platinum p-3">
            Notifications List
          </Text>
        </View>
      </View>
      {data?.length! < 1 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-platinum">You don't have any reminders</Text>
        </View>
      ) : (
        <View className="flex-1">
          {data?.map((entry) => (
            <View
              className="flex-row p-3 bg-dark mb-3 rounded-lg justify-between items-center"
              key={entry.notification.id}>
              <View>
                <Text>{entry.notification.title}</Text>
                <Text>{entry.notification.body}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveNotif(entry.notification.id!)}
                className="bg-black p-1 rounded-full">
                <AntDesign name="close" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {data?.length! > 0 && (
        <TouchableOpacity
          onPress={handleClearNotif}
          className="bg-davysGrey w-1/3 p-3 mb-10 rounded-xl self-center">
          <Text className="text-ghostWhite text-center font-main text-base">Delete All</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
