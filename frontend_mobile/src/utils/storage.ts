import * as SecureStore from 'expo-secure-store';

export const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  USER_DATA: 'user_data',
} as const;

export const storage = {
  async save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },

  async get(key: string) {
    return await SecureStore.getItemAsync(key);
  },

  async delete(key: string) {
    await SecureStore.deleteItemAsync(key);
  },

  async clear() {
    await Promise.all(
      Object.values(StorageKeys).map((key) => SecureStore.deleteItemAsync(key))
    );
  },
};
