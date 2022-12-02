import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useGetAnimeSearchQuery } from '@services/api/apiSlice';
import { AnimeById } from 'src/types/animeTypes';
import FastImage from 'react-native-fast-image';

export default function SearchScreen() {
  const [textInput, setTextInput] = useState('');
  //   const { data, isFetching } = useGetTopAnimeQuery(1);
  const { data, isFetching } = useGetAnimeSearchQuery(textInput);
  //   console.log('123', data, isFetching);

  const handleInput = (input: string) => {
    setTextInput(input);
  };

  const ListItem = ({ item }: { item: AnimeById }) => {
    return (
      <View className="bg-gray flex-row items-center p-1">
        <View className="w-1/3">
          <FastImage className="w-32 h-16 rounded-md" source={{ uri: item.images.jpg.image_url }} />
        </View>
        <View className="flex-1 ml-3 mr-2 flex-row justify-between">
          <View className="w-3/4">
            <Text className="text-ghostWhite">{item.title}</Text>
          </View>
          <TouchableOpacity>
            <AntDesign className="mr-2" name="play" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity className="flex-row items-center ml-4 mt-10">
        <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
      </TouchableOpacity>

      <View className="flex flex-row justify-between mt-5 mb-4 bg-darkGray">
        <TouchableOpacity className="flex-row items-center ml-4">
          <AntDesign name="search1" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          className="text-ghostWhite text-base"
          placeholder="Search for a show, movie, genre, etc."
          placeholderTextColor="#f8f7ffff"
          value={textInput}
          onChangeText={(text) => handleInput(text)}
        />
        <TouchableOpacity className="flex-row items-center ml-3 mr-3">
          <FontAwesome name="microphone" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
      <View className="mb-4">
        <Text className="text-ghostWhite text-xl font-bold ml-4">Top Searches</Text>
      </View>

      {isFetching && <ActivityIndicator />}
      {data && (
        <FlatList
          ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
          data={data?.data}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      )}
    </View>
  );
}
