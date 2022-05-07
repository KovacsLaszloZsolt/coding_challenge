export type FoodEntryDetails = Record<string, { unit: string; amount: number }>;
export type FoodEntryCreateOptions = {
  name: string;
  details?: FoodEntryDetails;
};
export type FoodEntry = FoodEntryCreateOptions & { _id?: string; createdAt?: Date };
export type FoodEntryUpdateOptions = Partial<FoodEntryCreateOptions>;

export interface LayoutProps {
  children: React.ReactNode;
}

export interface UserInfo {
  email: string;
  password: string;
}

export type InputValidation = {
  emailError: string;
  emailValid: boolean;
  passwordError: string;
  passwordValid: boolean;
};

export type ToastMsg = {
  msg: string;
  type: string;
};

export type AddUpdateDialog = {
  type: string;
  title: string;
  isOpen: boolean;
  food: FoodEntry;
};

export type User = {
  email: string;
  token: string;
};
