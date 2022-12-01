import { View, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';

const width: number = Dimensions.get('screen').width;

const SplashScreen = () => {
  // const naigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const finalWidth = width / 1.5;

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: finalWidth,
      // duration: 5000,
      // bounciness: 10,
      speed: 0,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, finalWidth]);

  // const wait = useCallback((timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // }, []);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      {/* <Animated.View> */}
      <Animated.Text
        className="text-maximumRed font-main text-3xl font-extrabold "
        style={{ width: fadeAnim }}>
        WakuWaku
      </Animated.Text>
      {/* </Animated.View> */}
    </View>
  );
};

export default SplashScreen;
