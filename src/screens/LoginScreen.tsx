import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { RootStackProps } from '@src/types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@app/hooks/useAuth';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useViewportUnits } from '@app/hooks/main';

const LoginScreen = ({ navigation }: RootStackProps) => {
  const {
    isLoading,
    isWrongEmail,
    isWrongPassword,
    isPasswordEmpty,
    isEmailEmpty,
    handleSignIn,
    handleGoogleButtonPress,
    handleEmail,
    handlePassword,
  } = useAuth();

  const { vw, vh } = useViewportUnits();
  const handleNavigation = () => navigation.navigate('SignUp');
  isLoading && <ActivityIndicator />;
  const handeDismissKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={require('../assets/Images/bachgroundAnime.jpeg')}
        className="flex-1"
        style={{ width: vw * 100, height: vh * 100 }}>
        <TouchableWithoutFeedback className="flex-1" onPress={handeDismissKeyboard}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']}
            locations={[0, 0.5]}
            className="absolute top-0 left-0 bottom-0 right-0 bg-transparent">
            <>
              <Text className="text-maxRed mt-48 mb-10 font-title text-4xl text-center">
                WakuWaku
              </Text>
              <View>
                <View className="mb-5">
                  <TouchableOpacity className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
                    <AntDesign name="mail" size={20} color="#fff" />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#F8F7FF"
                      className="px-3 text-white flex-1"
                      onChangeText={handleEmail}
                    />
                  </TouchableOpacity>
                  {isWrongEmail && <Text className="text-maxRed mx-5 mt-2">Incorrect email</Text>}
                  {isEmailEmpty && <Text className="text-maxRed mx-5 mt-2">Email is required</Text>}
                </View>
                <View>
                  <TouchableOpacity className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
                    <AntDesign name="lock1" size={20} color="#fff" />
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Password"
                      placeholderTextColor="#F8F7FF"
                      className="px-3 text-white flex-1"
                      onChangeText={handlePassword}
                      onSubmitEditing={handleSignIn}
                    />
                  </TouchableOpacity>
                  {isWrongPassword && (
                    <Text className="text-maxRed mx-5 mt-2">Incorrect password</Text>
                  )}
                  {isPasswordEmpty && (
                    <Text className="text-maxRed mx-5 mt-2">Password is required</Text>
                  )}
                </View>
              </View>
              <View className=" border-davysGrey border-2 rounded-md mx-5 mt-7">
                <TouchableOpacity className="bg-black px-5 rounded-md" onPress={handleSignIn}>
                  <Text className="text-ghostWhite text-center py-3 font-main font-bold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View className=" border-davysGrey border-2 rounded-md mx-5 mt-2">
                <TouchableOpacity
                  className="bg-black px-5 rounded-md"
                  onPress={handleGoogleButtonPress}>
                  <Text className="text-ghostWhite text-center py-3 font-main font-bold">
                    Login with Google
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text className="text-ghostWhite font-bold font-main text-center mt-3">
                  New to WakuWaku? Sign up now.
                </Text>
              </TouchableOpacity>
            </>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </FastImage>
    </SafeAreaView>
  );
};

export default LoginScreen;
