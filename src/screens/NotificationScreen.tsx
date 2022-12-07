import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-black flex-1 p-3">
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="close" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
