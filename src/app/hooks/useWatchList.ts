import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';

export const useWatchList = (item) => {
  const [userId, setUserId] = useState();
  const [watchList, setWatchList] = useState([]);
  const onAuthStateChanged = (user) => {
    setUserId(user.uid);
  };
  useEffect(() => {
    const userData = auth().onAuthStateChanged(onAuthStateChanged);
    return userData;
  }, []);

  const handleAddWatchList = () => {
    const data = { animeList: firebase.firestore.FieldValue.arrayUnion(item) };
    firestore().collection('anime').doc(userId).set(data, { merge: true });
  };

  const handleRemoveWatchList = () => {};

  const getWatchList = () => {
    firestore()
      .collection('anime')
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        return 123;
      });
  };

  return { handleAddWatchList, getWatchList };
};
