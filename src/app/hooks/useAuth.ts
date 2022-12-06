import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  GoogleSignin.configure({
    webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
  });

  const handleSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sign in successfully',
      text2: 'Welcome to wakuwaku',
    });
  };

  const handleUnsuccessfulLogin = () => {
    Toast.show({
      type: 'error',
      text1: 'Sign in failed',
      text2: 'Something went wrong :(',
    });
  };

  const handleEmail = (input: string) => {
    if (!input.trim()) {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
      setEmail(input);
    }
  };

  const handlePassword = (input: string) => {
    if (!input.trim()) {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
      setPassword(input);
    }
  };

  const handleUser = (credential: FirebaseAuthTypes.User | null) => {
    setIsLoading(true);
    if (credential) {
      setUser(credential);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      handleUnsuccessfulLogin();
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        handleSuccessToast();
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
        handleUnsuccessfulLogin();
      });
    setIsWrongEmail(false);
    setIsWrongPassword(false);
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => handleUser(null));
  };

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isWrongEmail,
    isWrongPassword,
    isPasswordEmpty,
    isEmailEmpty,
    handleSignIn,
    handleSignOut,
    handleGoogleButtonPress,
    handleEmail,
    handlePassword,
  };
};
