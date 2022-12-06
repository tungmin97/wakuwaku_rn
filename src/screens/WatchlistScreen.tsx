import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WatchlistScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        <View className="flex-row justify-between p-3">
          <Text className="mr-auto font-main font-extrabold text-3xl text-platinum">My List</Text>
          <View className="flex items-center">
            <AntDesign name="search1" size={25} color="#f8f7ffff" />
          </View>
        </View>
        {/* {isSuccess && (
          <View className="m-2">
            <FlatList
              ItemSeparatorComponent={() => <View className="w-full h-[2px] bg-black" />}
              data={results}
              initialNumToRender={3}
              horizontal={true}
              keyExtractor={(item) => String(item.mal_id)}
              renderItem={({ item }) => <SmallAnimeCard item={item} />}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              onEndReached={handleOnEndReached}
              refreshing={false}
              onRefresh={handleRefresh}
            />
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
}
