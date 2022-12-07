import { SetUserProps } from 'src/types/authTypes';
import { useMMKVObject } from 'react-native-mmkv';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useSetAndGetUser } from './useSetAndGetUser';
import { useAppDispatch } from './main';
import { useToast } from './useToast';
import { setCurrentUser } from '@services/users/userSlice';

export const useSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isUsernameEmpty, setisUsernameEmpty] = useState(false);
  const [data, setData] = useMMKVObject<SetUserProps>('credential');
  const dispatch = useAppDispatch();
  const { getUser, setUser } = useSetAndGetUser();
  const { handleSuccessToast, handleFailureToast } = useToast();
  const handleUsername = (input: string) => {
    if (!input.trim()) {
      setisUsernameEmpty(true);
    } else {
      setisUsernameEmpty(false);
      setUsername(input);
    }
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

  const handleSignUp = () => {
    if (!email.trim() || !password.trim()) {
      handleFailureToast({
        title: 'Sign up failed',
        body: 'No field can be empty :(',
      });
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const { uid } = auth().currentUser!;
        setUser({ uid, username, email, password }).then(async () => {
          setData({ uid, username, email, password, avatar: 'https://i.imgur.com/guEoEon.jpg' });
          dispatch(setCurrentUser(await getUser(uid)));
        });
        handleSuccessToast({ title: 'Sign up successfully', body: 'Welcome to wakuwaku' });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          handleFailureToast({
            title: 'Invalid email address',
            body: 'Email address is already in use!',
          });
        }
        if (error.code === 'auth/invalid-email') {
          handleFailureToast({
            title: 'Invalid email address',
            body: 'Make sure you entered the correct email address!',
          });
        }
        if (error.code === 'auth/weak-password') {
          handleFailureToast({
            title: 'Invalid password',
            body: 'Password should be at least 6 characters',
          });
        }
      });
  };

  return {
    isUsernameEmpty,
    isEmailEmpty,
    isPasswordEmpty,
    handleUsername,
    handleEmail,
    handlePassword,
    handleSignUp,
  };
};
