import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useSetAndGetUser } from './useSetAndGetUser';
import { useAppDispatch } from './main';
import { setCurrentUser } from '@services/users/userSlice';

export const useSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isUsernameEmpty, setisUsernameEmpty] = useState(false);

  const dispatch = useAppDispatch();
  const { getUser, setUser } = useSetAndGetUser();

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

  const handleToastEmailUsed = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid email address',
      text2: 'Email address is already in use!',
    });
  };

  const handleToastEmailInvalid = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid email address',
      text2: 'The email address is badly formatted.',
    });
  };

  const handleToastPasswordInvalid = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid password',
      text2: 'Password should be at least 6 characters',
    });
  };

  const handleSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sign up successfully',
      text2: 'Welcome to wakuwaku',
    });
  };

  const handleUnsuccessfulSignUp = () => {
    Toast.show({
      type: 'error',
      text1: 'Sign up failed',
      text2: 'No field can be empty :(',
    });
  };

  const handleSignUp = () => {
    if (!email.trim() || !password.trim()) {
      handleUnsuccessfulSignUp();
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth().currentUser;
        const { uid } = currentUser!;
        setUser({ uid, username, email, password }).then(async () =>
          dispatch(setCurrentUser(await getUser(uid))),
        );
        handleSuccessToast();
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          handleToastEmailUsed();
        }
        if (error.code === 'auth/invalid-email') {
          handleToastEmailInvalid();
        }
        if (error.code === 'auth/weak-password') {
          handleToastPasswordInvalid();
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
