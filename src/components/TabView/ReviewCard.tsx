import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PropsInterface {
  userName: string;
  date: string;
  image: string;
  review: string;
  id: number;
}

const ReviewCard = (props: PropsInterface) => {
  return (
    <View className="mx-5 mb-5" key={props.id}>
      <View className="flex-row justify-between">
        <View>
          <View className="flex-row items-center">
            <Image
              source={{
                uri: props.image,
              }}
              style={styles.image}
            />
            <Text className="text-ghostWhite text-sm mx-2">{props.userName}</Text>
          </View>
          <Text className="text-ghostWhite opacity-50 text-[10px] my-2">{props.date}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="hearto" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-ghostWhite text-sm mr-3" numberOfLines={3}>
        {props.review}
      </Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
});
