import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useGetAnimeSearchQuery } from '@services/api/apiSlice';
import SearchItemCard from '@components/SearchItemCard/SearchItemCard';
import SearchLoading from '@components/Loading/SearchLoading';
import { RootStackProps } from 'src/types/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen({ navigation }: RootStackProps) {
  const [textInput, setTextInput] = useState('');
  const { data, isFetching } = useGetAnimeSearchQuery(textInput);
  const handleInput = (input: string) => {
    setTextInput(input);
  };
  const handleCancelInput = () => {
    setTextInput('');
    Keyboard.dismiss();
  };
  const handleNavigation = () => navigation.goBack();
  const handleDismissKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView className="flex-1 bg-black pt-3">
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View className="flex-row items-center pl-2">
          <TouchableOpacity onPress={handleNavigation}>
            <AntDesign name="arrowleft" size={25} color="#f8f7ff" />
          </TouchableOpacity>
          <View className="flex-1" />
        </View>
      </TouchableWithoutFeedback>
      <View className="flex flex-row justify-between mt-5 mb-4 bg-darkGray">
        <View className="flex-1 flex-row items-center">
          <TouchableOpacity className="flex-row items-center ml-4 mr-3">
            <AntDesign name="search1" size={25} color="#f8f7ff" />
          </TouchableOpacity>
          <TextInput
            autoFocus={true}
            className="flex-1 text-ghostWhite text-base font-main"
            placeholder="Explore your favourites..."
            placeholderTextColor="#f8f7ff"
            value={textInput}
            onChangeText={(text) => handleInput(text)}
          />
        </View>
        <TouchableOpacity className="flex-row items-center ml-3 mr-3" onPress={handleCancelInput}>
          <FontAwesome name="close" size={25} color="#f8f7ff" />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View className="mb-4">
          <Text className="text-ghostWhite text-xl font-bold font-main ml-4">Top Search</Text>
        </View>
      </TouchableWithoutFeedback>
      {isFetching ? (
        <SearchLoading num={10} />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
          data={data?.data}
          renderItem={({ item }) => <SearchItemCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
}
