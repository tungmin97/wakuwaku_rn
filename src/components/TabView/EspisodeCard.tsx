import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface propsInterface {
  img: string;
  espisode: number;
  title: string;
}

const EspisodeCard = (props: propsInterface) => {
  return (
    <TouchableOpacity className="flex-row items-center mx-5 mb-2">
      <Image
        source={{
          uri: props.img,
        }}
        style={styles.image}
      />
      <AntDesign name="playcircleo" size={20} color="white" style={styles.iconPlay} />
      <Text className="text-ghostWhite w-40 text-xs">
        {props.espisode}. {props.title}
      </Text>
      <AntDesign name="right" size={20} color="white" style={styles.iconRight} />
    </TouchableOpacity>
  );
};

export default EspisodeCard;

const styles = StyleSheet.create({
  iconPlay: {
    position: 'absolute',
    top: 25,
    left: 65,
  },
  image: {
    width: 150,
    height: 70,
    marginRight: 13,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
  },
});