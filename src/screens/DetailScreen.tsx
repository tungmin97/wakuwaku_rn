import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function DetailScreen() {
  const dimensionForScreen = Dimensions.get('screen');

  return (
    <View className="flex-1 bg-black">
      <View className="flex-row justify-between m-4">
        <AntDesign name="arrowleft" size={20} color="white" />
        <AntDesign name="search1" size={20} color="white" />
      </View>
      <YoutubeIframe height={210} width={dimensionForScreen.width} videoId="J7eYhM6wXPo" />
      <Text className=" text-white m-4">Movie's Name</Text>
      <TouchableOpacity className="bg-white flex-row mx-4 p-3">
        <AntDesign name="caretright" size={20} color="black" />
        <Text>Play</Text>
      </TouchableOpacity>
      <Text className=" text-white m-4">Description</Text>
      <View className="flex-row justify-around items-center">
        <View>
          <AntDesign name="plus" size={20} color="white" />
          <Text className=" text-white">My list</Text>
        </View>
        <View>
          <AntDesign name="like2" size={20} color="white" />
          <Text className=" text-white">Rate</Text>
        </View>
        <View>
          <AntDesign name="sharealt" size={20} color="white" />
          <Text className=" text-white">Share</Text>
        </View>
      </View>
    </View>
  );
}
