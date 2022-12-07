import { SetUserProps } from './../../types/authTypes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from './useToast';

export const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<SetUserProps>();
  const [retrivedFromStorage, setRetrievedFromStorage] = useState(false);
  const { handleFailureToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setData(JSON.parse(value!));
        setRetrievedFromStorage(true);
      } catch (error) {
        handleFailureToast({
          title: "Can't get item from storage",
          body: `Error mgs: ${error}`,
        });
      }
    })();
  }, [handleFailureToast, key]);

  const setStorage = async (value: SetUserProps) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setData(value);
    } catch (error) {
      handleFailureToast({
        title: "Can't save item to storage",
        body: `Error mgs: ${error}`,
      });
    }
  };

  return { data, setStorage, retrivedFromStorage };
};
