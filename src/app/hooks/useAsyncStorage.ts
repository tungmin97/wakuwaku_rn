import { SetUserProps } from './../../types/authTypes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<SetUserProps>();
  const [retrivedFromStorage, setRetrievedFromStorage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setData(JSON.parse(value!));
        setRetrievedFromStorage(true);
      } catch (error) {
        console.error('useAsyncStorage getItem error:', error);
      }
    })();
  }, [key]);

  const setStorage = async (value: SetUserProps) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setData(value);
    } catch (error) {
      console.error('useAsyncStorage setItem error:', error);
    }
  };

  return { data, setStorage, retrivedFromStorage };
};
