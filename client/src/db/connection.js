import { openDB } from 'idb';

const DB_NAME = 'rpApp';
const STORE_NAME = 'rp_app_store';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export default dbPromise;