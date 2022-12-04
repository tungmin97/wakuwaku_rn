import { View, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';

const width: number = Dimensions.get('screen').width;

const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const finalWidth = width / 1.5;

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: finalWidth,
      bounciness: 3,
      speed: 0,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('HomeTab');
    });
  }, [fadeAnim, finalWidth, navigation]);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Animated.View>
        <Animated.Text
          className="text-maxRed font-main text-3xl font-extrabold "
          style={{ width: fadeAnim }}>
          WakuWaku
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
