import { SetUserProps } from 'src/types/authTypes';
import { AnimeById, WatchListProps } from '@src/types/animeTypes';
import { useEffect } from 'react';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useMMKVObject } from 'react-native-mmkv';

export const useWatchList = () => {
  const [watchList, setWatchList] = useMMKVObject<
    FirebaseFirestoreTypes.DocumentData | WatchListProps | null
  >('watchlist');
  const [data] = useMMKVObject<SetUserProps>('credential');
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
  }, [setWatchList, uid]);

  return { handleAddWatchList, handleRemoveWatchList, watchList };
};
