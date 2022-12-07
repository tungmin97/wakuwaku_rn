import { useMMKVObject } from 'react-native-mmkv';
import { useEffect, useState } from 'react';
import { SetUserProps } from '@src/types/authTypes';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type LikedReview = {
  reviewList: ReviewList[];
};

type ReviewList = {
  id: number;
};

type PropsInterface = {
  userName: string;
  date: string;
  image: string;
  review: string;
  id: number;
};

export const useLikedReview = (item: PropsInterface) => {
  const [hasLike, setHasLike] = useState(false);
  const [liked, setLiked] = useMMKVObject<FirebaseFirestoreTypes.DocumentData | LikedReview>(
    'reviews',
  );
  const [data] = useMMKVObject<SetUserProps>('credential');
  const uid = data?.uid;

  const toggleLikedReview = () => {
    if (hasLike) {
      handleRemoveLikedReview();
      setHasLike(false);
    } else {
      handleLikedReview();
      setHasLike(true);
    }
  };

  useEffect(() => {
    if (liked?.reviewList.some((entry: ReviewList) => entry.id === item.id)) {
      setHasLike(true);
    } else {
      setHasLike(false);
    }
  }, [item.id, liked]);

  const handleLikedReview = () => {
    const reviewList = { reviewList: firebase.firestore.FieldValue.arrayUnion(item) };
    firestore().collection('reviews').doc(uid).set(reviewList, { merge: true });
  };

  const handleRemoveLikedReview = () => {
    const reviewList = { reviewList: firebase.firestore.FieldValue.arrayRemove(item) };
    firestore().collection('reviews').doc(uid).set(reviewList, { merge: true });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('reviews')
      .doc(uid)
      .onSnapshot((documentSnapshot) => {
        setLiked(documentSnapshot.data());
      });

    return () => subscriber();
  }, [setLiked, uid]);

  return { toggleLikedReview, hasLike };
};
