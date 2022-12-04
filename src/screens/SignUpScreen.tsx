import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('screen');

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBlurUsername, setIsBlurUsername] = useState(false);
  const [isBlurPassword, setIsBlurPassword] = useState(false);
  const [isBlurEmail, setIsBlurEmail] = useState(false);

  const signUpHandler = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <LinearGradient
        colors={['#000', '#000', '#353839', '#000', '#000', '#000', '#000']}
        className="flex-1">
        <ImageBackground
          source={require('../assets/Images/8afaf7262830dc9480760b8f4878c1c1.jpg')}
          className="flex-1"
          imageStyle={styles.imageBackground}>
          <View className="flex-row items-center justify-between mx-5 my-2">
            <Text className="text-ghostWhite text-5xl font-title text-maxRed">W</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text className="text-ghostWhite font-bold"> SIGN IN</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView className="flex-1">
            <View style={styles.header}>
              <Text className="text-ghostWhite font-bold text-center mb-7 text-2xl">
                Create account
              </Text>

              <View className="mb-5">
                <View className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
                  <AntDesign name="user" size={20} color="#fff" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="#F8F7FF"
                    className="px-3"
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                    onBlur={() => {
                      setIsBlurUsername(true);
                    }}
                  />
                </View>
                {isBlurUsername && username.trim().length === 0 ? (
                  <Text className="text-maxRed mx-5 mt-2">Username is not required</Text>
                ) : null}
              </View>

              <View className="mb-5">
                <View className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
                  <AntDesign name="mail" size={20} color="#fff" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#F8F7FF"
                    className="px-3"
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    onBlur={() => {
                      setIsBlurEmail(true);
                    }}
                  />
                </View>
                {isBlurEmail && email.trim().length === 0 ? (
                  <Text className="text-maxRed mx-5 mt-2">Email is not required</Text>
                ) : null}
              </View>

              <View className="mb-5">
                <View className="bg-davysGrey rounded-md mx-5 px-3 flex-row items-center">
                  <AntDesign name="lock1" size={20} color="#fff" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#F8F7FF"
                    className="px-3"
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    onBlur={() => {
                      setIsBlurPassword(true);
                    }}
                  />
                </View>
                {isBlurPassword && email.trim().length === 0 ? (
                  <Text className="text-maxRed mx-5 mt-2">Password is not required</Text>
                ) : null}
              </View>

              <View className=" border-maxRed border-2 rounded-md mx-5 mt-7" style={styles.shadow}>
                <TouchableOpacity className="bg-black px-5 rounded-md" onPress={signUpHandler}>
                  <Text className="text-ghostWhite text-center py-3 font-main font-bold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#E50813',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  textInput: {
    color: 'white',
  },
  header: { width: width, marginTop: 150 },
  imageBackground: { opacity: 0.4 },
});
