export type LocalStorageItems = {
  token?: string;
};

export const getLocalStorageItem = <T extends keyof LocalStorageItems>(
  key: T
): LocalStorageItems[T] => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : value;
};
