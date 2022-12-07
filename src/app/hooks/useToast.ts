import Toast from 'react-native-toast-message';

export const useToast = () => {
  interface ToastProps {
    title: string;
    body: string;
  }

  const handleSuccessToast = ({ title, body }: ToastProps) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: body,
    });
  };

  const handleFailureToast = ({ title, body }: ToastProps) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: body,
    });
  };
  return { handleSuccessToast, handleFailureToast };
};
