import dbPromise from './connection';

const dbService = {
  async get(store_name, key) {
    const db = await dbPromise;
    return db.get(store_name, key);
  },

  async set(store_name, key, val) {
    const db = await dbPromise;
    return db.put(store_name, val, key);
  },

  async delete(store_name, key) {
    const db = await dbPromise;
    return db.delete(store_name, key);
  },
};

export default dbService;