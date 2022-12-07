import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLikedReview } from '@app/hooks/useLikedReview';

type PropsInterface = {
  userName: string;
  date: string;
  image: string;
  review: string;
  id: number;
};

const ReviewCard = (props: PropsInterface) => {
  const { toggleLikedReview, hasLike } = useLikedReview(props);

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
            <Text className="text-ghostWhite text-sm mx-2 font-main">{props.userName}</Text>
          </View>
          <Text className="text-ghostWhite opacity-50 text-[10px] my-2 font-main">
            {props.date}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleLikedReview}>
          <AntDesign name="hearto" size={20} color={`${hasLike ? 'red' : 'white'}`} />
        </TouchableOpacity>
      </View>
      <Text className="text-ghostWhite text-sm mr-3 font-main" numberOfLines={3}>
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
