import { AnimeById, WatchListProps } from '@src/types/animeTypes';
import { useAsyncStorage } from './useAsyncStorage';
import { useEffect, useState } from 'react';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<
    FirebaseFirestoreTypes.DocumentData | WatchListProps | null
  >(null);

  const { data } = useAsyncStorage('credential');
  const uid = data?.uid;

  const handleAddWatchList = (item: AnimeById) => {
    const animeList = { animeList: firebase.firestore.FieldValue.arrayUnion(item) };
    firestore().collection('anime').doc(uid).set(animeList, { merge: true });
  };

  const handleRemoveWatchList = (item: AnimeById) => {
    const animeList = { animeList: firebase.firestore.FieldValue.arrayRemove(item) };
    firestore().collection('anime').doc(uid).set(animeList, { merge: true });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('anime')
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        setWatchList(documentSnapshot.data() || null);
      });

    return () => subscriber();
  }, [uid]);

  return { handleAddWatchList, handleRemoveWatchList, watchList };
};
