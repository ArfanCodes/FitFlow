interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const Storage: StorageAdapter = {
  getItem: async (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // silent
    }
  },
  removeItem: async (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // silent
    }
  },
};

export default Storage;
