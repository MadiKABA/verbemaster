import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "verbmasterdb";
const DB_VERSION = 1;
const STORE_QUIZ = "quizstore";
const STORE_LASTQUIZ = "lastquizstore";
const STORE_RESULTQUIZ = "resultquizstore";

interface Post {
  id: number;
  // Define other fields of your post object here
}

export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_QUIZ)) {
        db.createObjectStore(STORE_QUIZ, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_LASTQUIZ)) {
        db.createObjectStore(STORE_LASTQUIZ, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_RESULTQUIZ)) {
        db.createObjectStore(STORE_RESULTQUIZ, { keyPath: "id" });
      }
    },
  });
};

export const getPosts = async (db: IDBPDatabase): Promise<Post[]> => {
  return db.getAll(STORE_QUIZ);
};

export const savePosts = async (db: IDBPDatabase, posts: Post[]): Promise<void> => {
  const tx = db.transaction(STORE_QUIZ, "readwrite");
  posts.forEach((post) => tx.store.put(post));
  await tx.done;
};

export const clearPosts = async (db: IDBPDatabase): Promise<void> => {
  const tx = db.transaction(STORE_QUIZ, "readwrite");
  await tx.store.clear();
  await tx.done;
};
export const getItemById = async (id: number) => {
  const db = await initDB();
  return db.transaction(STORE_QUIZ).objectStore(STORE_QUIZ).get(id);
};