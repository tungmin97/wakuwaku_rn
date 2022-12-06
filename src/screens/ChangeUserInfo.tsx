import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChangeUserInfo = () => {
  return (
    <SafeAreaView className="bg-black flex-1">
      <View className="flex-row">
        <AntDesign name="arrowleft" size={20} color="#fff" />
        <Text className="text-white">User Information</Text>
      </View>
    </SafeAreaView>
  );
};
``;

export default ChangeUserInfo;

const styles = StyleSheet.create({});
