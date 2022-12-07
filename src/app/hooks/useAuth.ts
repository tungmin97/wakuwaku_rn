import { useMMKVObject } from 'react-native-mmkv';
import { useCallback, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSetAndGetUser } from '@app/hooks/useSetAndGetUser';
import { useToast } from './useToast';
import { SetUserProps } from '@src/types/authTypes';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [data, setData] = useMMKVObject<SetUserProps>('credential');
  const { storeUserSocial } = useSetAndGetUser();
  const { handleSuccessToast, handleFailureToast } = useToast();

  GoogleSignin.configure({
    webClientId: '1059353179213-ct2p9blvdl8j05opqqhvqic7vthjqeks.apps.googleusercontent.com',
  });

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

  const handleUser = useCallback((credential: FirebaseAuthTypes.User | null) => {
    setIsLoading(true);
    if (credential) {
      setUser(credential);
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const handleGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        const { uid, displayName, photoURL } = auth().currentUser!;
        if (data?.uid !== uid) {
          storeUserSocial({ uid, username: displayName!, avatar: photoURL! }).then(async () => {
            setData({ uid, username: displayName!, avatar: photoURL! });
          });
        }
      });
  };

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      handleFailureToast({ title: 'Sign in failed', body: 'Something went wrong :(' });
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        handleSuccessToast({ title: 'Sign in successfully', body: 'Welcome to wakuwaku' });
        const { uid, displayName } = auth().currentUser!;
        if (data?.uid !== uid) {
          setData({
            uid,
            username: displayName!,
            email,
            password,
            avatar: 'https://i.imgur.com/guEoEon.jpg',
          });
          setIsWrongEmail(false);
          setIsWrongPassword(false);
        }
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setIsWrongEmail(true);
        }
        if (error.code === 'auth/wrong-password') {
          setIsWrongPassword(true);
        }
        handleFailureToast({ title: 'Sign in failed', body: 'Something went wrong :(' });
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
    const unsubscribe = auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, [handleUser]);

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
