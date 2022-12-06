import firestore from '@react-native-firebase/firestore';
import { SetUserProps, SetUserSocialProps } from 'src/types/authTypes';

export const useSetAndGetUser = () => {
  const setUser = ({ uid, username, email, password }: SetUserProps) =>
    firestore().collection('users').doc(uid).set({
      uid,
      username,
      email,
      password,
      avatar:
        'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-couple-boy-cute-avatar-image_1153281.jpg',
    });

  const storeUserSocial = ({ uid, username, avatar }: SetUserSocialProps) =>
    firestore().collection('users').doc(uid).set({
      uid,
      username,
      avatar,
    });

  const getUser = async (uid: string) => await firestore().collection('users').doc(uid).get();

  const updateUsername = async (uid: string, username: string) =>
    await firestore().collection('users').doc(uid).update({ username: username });

  const updateUserAvatar = async (uid: string, avatar: string) =>
    await firestore().collection('users').doc(uid).update({ avatar: avatar });

  return { setUser, storeUserSocial, getUser, updateUsername, updateUserAvatar };
};
