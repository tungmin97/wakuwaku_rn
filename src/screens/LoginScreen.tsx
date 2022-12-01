import { Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

GoogleSignin.configure({
  webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View className="flex-1">
      <LinearGradient colors={['#0e1111', '#232b2b', '#353839']} style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="cover"
          source={require('../assets/Images/bachgroundAnime.jpeg')}
          className="flex-1"
          imageStyle={{ opacity: 0.15 }}>
          <Text className="text-maxRed mt-48 mb-10 font-title text-4xl text-center">wakuwaku</Text>
          <View>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#F8F7FF"
              className="bg-davysGrey rounded-md mx-5 mb-2 p-3"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#F8F7FF"
              className="bg-davysGrey rounded-md mx-5 p-3"
              contextMenuHidden={true}
            />
          </View>

          <View className=" border-davysGrey border-2 rounded-md mx-5 mt-7">
            <TouchableOpacity className="bg-black px-5 rounded-md">
              <Text className="text-ghostWhite text-center py-3 font-main font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className=" border-davysGrey border-2 rounded-md mx-5 mt-2">
            <TouchableOpacity className="bg-black px-5 rounded-md" onPress={onGoogleButtonPress}>
              <Text className="text-ghostWhite text-center py-3 font-main font-bold">
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text className="text-ghostWhite font-bold font-main text-center m-5">
              New to WakuWaku? Sign up now.
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
