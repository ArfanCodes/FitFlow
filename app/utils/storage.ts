// ============================================================
// utils/storage.ts — Error-proof Storage Adapter
// 
// Prevents "Native module is null" crashes in Expo Go by falling 
// back to an in-memory dictionary if the native module isn't linked.
// ============================================================

interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// In-memory fallback if AsyncStorage native module is missing
const memoryStorage = new Map<string, string>();

let Storage: StorageAdapter;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  Storage = {
    getItem: async (key) => {
      try { return await AsyncStorage.getItem(key); } 
      catch { return memoryStorage.get(key) || null; }
    },
    setItem: async (key, value) => {
      try { await AsyncStorage.setItem(key, value); } 
      catch { memoryStorage.set(key, value); }
    },
    removeItem: async (key) => {
      try { await AsyncStorage.removeItem(key); } 
      catch { memoryStorage.delete(key); }
    },
  };
} catch {
  // Total failure (e.g. package missing), use memory
  Storage = {
    getItem: async (key) => memoryStorage.get(key) || null,
    setItem: async (key, value) => { memoryStorage.set(key, value); },
    removeItem: async (key) => { memoryStorage.delete(key); },
  };
}

export default Storage;
