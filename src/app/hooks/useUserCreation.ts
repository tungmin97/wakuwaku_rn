import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export const useUserCreation = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBlurUsername, setIsBlurUsername] = useState(false);
  const [isBlurPassword, setIsBlurPassword] = useState(false);
  const [isBlurEmail, setIsBlurEmail] = useState(false);

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

  return { handleSignUp };
};
