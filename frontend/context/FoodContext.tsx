import { LayoutProps, FoodEntry, User, ToastMsg, AddUpdateDialog } from '../interfaces';
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export type FoodContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  toastMsg: ToastMsg;
  setToastMsg: Dispatch<SetStateAction<ToastMsg>>;
  foods: FoodEntry[] | null;
  getFoods: () => void;
  handleError: (err: unknown) => void;
  addUpdateDialog: AddUpdateDialog;
  setAddUpdateDialog: Dispatch<SetStateAction<AddUpdateDialog>>;
};

const FoodContext = createContext<FoodContextType | null>(null);

export const FoodProvider = ({ children }: LayoutProps): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [toastMsg, setToastMsg] = useState<ToastMsg>({ msg: '', type: '' });
  const [foods, setFoods] = useState<FoodEntry[] | null>(null);
  const [addUpdateDialog, setAddUpdateDialog] = useState({ type: '', title: '', isOpen: false, food: { name: '' } });

  const checkLocalStorage = (): void => {
    const data = localStorage.getItem('user');

    setUser(
      data
        ? { ...JSON.parse(localStorage.getItem('user') as string), isLogedIn: false }
        : { email: '', token: '', isLogedIn: false },
    );
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const getFoods = async (): Promise<void> => {
    try {
      if (!user?.token) {
        throw new Error('unAuth');
      }
      const response = await axios.get('http://127.0.0.1:3001/food', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setFoods(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (err: unknown): void => {
    const error = err as AxiosError;
    if (error.response?.status === 404) {
      return;
    }
    if (error.response?.status === 401 || error.message === 'unAuth') {
      // setToastMsg({ msg: "You are not logged in", type: "error" });
      localStorage.removeItem('user');
      setUser(null);
      void router.push('/login');
      // setTimeout(() => {
      // }, 1400);
      return;
    }

    setToastMsg({ msg: 'Something went wrong!', type: 'error' });
  };
  return (
    <FoodContext.Provider
      value={{
        user,
        setUser,
        toastMsg,
        setToastMsg,
        foods,
        getFoods,
        handleError,
        addUpdateDialog,
        setAddUpdateDialog,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
