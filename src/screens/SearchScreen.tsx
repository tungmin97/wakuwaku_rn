import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useGetAnimeSearchQuery } from '@services/api/apiSlice';
import { useNavigation } from '@react-navigation/native';
import SearchItemCard from '@src/components/SearchItemCard/SearchItemCard';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState('');
  const { data, isFetching } = useGetAnimeSearchQuery(textInput);

  const handleInput = (input: string) => {
    setTextInput(input);
  };

  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity
        className="flex-row items-center ml-4 mt-10"
        onPress={() => {
          navigation.goBack();
        }}>
        <AntDesign name="arrowleft" size={25} color="#f8f7ffff" />
      </TouchableOpacity>

      <View className="flex flex-row justify-between mt-5 mb-4 bg-darkGray">
        <View className="flex-row items-center">
          <TouchableOpacity className="flex-row items-center ml-4 mr-3">
            <AntDesign name="search1" size={25} color="#f8f7ffff" />
          </TouchableOpacity>
          <TextInput
            autoFocus={true}
            className="text-ghostWhite text-base font-main"
            placeholder="Search for a show, movie, genre, etc."
            placeholderTextColor="#f8f7ffff"
            value={textInput}
            onChangeText={(text) => handleInput(text)}
          />
        </View>
        <TouchableOpacity
          className="flex-row items-center ml-3 mr-3"
          onPress={() => {
            setTextInput('');
          }}>
          <FontAwesome name="close" size={25} color="#f8f7ffff" />
        </TouchableOpacity>
      </View>
      <View className="mb-4">
        <Text className="text-ghostWhite text-xl font-bold font-main ml-4">Top Searches</Text>
      </View>

      {isFetching && <ActivityIndicator />}
      {data && (
        <FlatList
          ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
          data={data?.data}
          renderItem={({ item }) => <SearchItemCard item={item} />}
        />
      )}
    </View>
  );
}
