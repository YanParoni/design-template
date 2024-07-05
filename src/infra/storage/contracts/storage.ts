export interface IStorage {
  get: (key: StorageKeys) => any;
  set: (key: StorageKeys, value: any, expires?: number, path?: string) => void;
  delete: (key: StorageKeys) => void;
}

export enum StorageKeys {
  AUTH_TOKEN = "@next-app/user-token",
}
