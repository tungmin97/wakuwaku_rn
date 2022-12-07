import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useViewportUnits } from '@app/hooks/main';

const Loading = () => {
  const { vh } = useViewportUnits();

  return (
    <View style={{ backgroundColor: 'black', flex: 1, paddingTop: vh * 40 }}>
      <LottieView
        source={require('../../assets/93816-loading.json')}
        style={{ backgroundColor: 'black', width: 200, alignSelf: 'center' }}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
