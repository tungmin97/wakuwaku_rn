import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from '@src/types/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';


GoogleSignin.configure({
  webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);

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
  
  const signInHandler = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        setIsWrongEmail(false);
        setIsWrongPassword(false);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setIsWrongEmail(true);
        }

        if (error.code === 'auth/wrong-password') {
          setIsWrongPassword(true);
        }

        console.error(error);
      });
    setIsWrongEmail(false);
    setIsWrongPassword(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ImageBackground
        source={require('../assets/Images/bachgroundAnime.jpeg')}
        className="flex-1"
        imageStyle={{ opacity: 0.3 }}>
        <Text className="text-maxRed mt-48 mb-10 font-title text-4xl text-center">WakuWaku</Text>
        <View>
          <View className="mb-5">
            <View className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
              <AntDesign name="mail" size={20} color="#fff" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#F8F7FF"
                className="px-3 text-white"
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
            {isWrongEmail ? <Text className="text-maxRed mx-5 mt-2">Incorrect email</Text> : null}
          </View>
          <View>
            <View className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
              <AntDesign name="lock1" size={20} color="#fff" />
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#F8F7FF"
                className="px-3 text-white"
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            {isWrongPassword ? (
              <Text className="text-maxRed mx-5 mt-2">Incorrect password</Text>
            ) : null}
          </View>
        </View>

        <View className=" border-davysGrey border-2 rounded-md mx-5 mt-7">
          <TouchableOpacity className="bg-black px-5 rounded-md" onPress={signInHandler}>
            <Text className="text-ghostWhite text-center py-3 font-main font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
        <View className=" border-davysGrey border-2 rounded-md mx-5 mt-2">
          <TouchableOpacity className="bg-black px-5 rounded-md" onPress={onGoogleButtonPress}>
            <Text className="text-ghostWhite text-center py-3 font-main font-bold">
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text className="text-ghostWhite font-bold font-main text-center mt-3">
            New to WakuWaku? Sign up now.
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
