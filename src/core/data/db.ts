import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "verbmasterdb";
const DB_VERSION = 1;
const STORE_QUIZ = "quizstore";
const STORE_LASTQUIZ = "lastquizstore";
const STORE_RESULTQUIZ = "resultquizstore";

interface NewQuiz {
  id: number;
  quiz: string;
  answer: string;
  past_tense: string;
  past_participle: string;
}
interface ResultQuiz {
  id: number;
  quiz: string;
  answer: string;
  past_tense: string;
  past_participle: string;
  is_validated: boolean;
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

export const getPosts = async (db: IDBPDatabase): Promise<NewQuiz[]> => {
  return db.getAll(STORE_QUIZ);
};

export const savePosts = async (db: IDBPDatabase, posts: NewQuiz[]): Promise<void> => {
  const tx = db.transaction(STORE_QUIZ, "readwrite");
  posts.forEach((post) => tx.store.put(post));
  await tx.done;
};
export const deleteItem = async (db: IDBPDatabase, id: number) => {
  // const db = await dbPromise;
  const tx = db.transaction(STORE_QUIZ, 'readwrite');
  const store = tx.objectStore(STORE_QUIZ);

  await store.delete(id);
};
export const clearPost = async (db: IDBPDatabase): Promise<void> => {
  const tx = db.transaction(STORE_QUIZ, "readwrite");
  await tx.store.clear();
  await tx.done;
};
export const saveLastQuiz = async (db: IDBPDatabase, post: NewQuiz): Promise<void> => {
  const tx = db.transaction(STORE_LASTQUIZ, "readwrite");
  await tx.store.put(post);
  await tx.done;
};
export const getResults = async (db: IDBPDatabase): Promise<ResultQuiz[]> => {
  return db.getAll(STORE_RESULTQUIZ);
};
export const saveResulttQuiz = async (db: IDBPDatabase, resultQuiz: ResultQuiz): Promise<void> => {
  const tx = db.transaction(STORE_RESULTQUIZ, "readwrite");
  await tx.store.put(resultQuiz);
  await tx.done;
};
export const clearLastQuiz = async (db: IDBPDatabase): Promise<void> => {
  const tx = db.transaction(STORE_LASTQUIZ, "readwrite");
  await tx.store.clear();
  await tx.done;
};
export const getLastQuiz = async (db: IDBPDatabase): Promise<NewQuiz[]> => {
  return db.getAll(STORE_LASTQUIZ);
};
export const clearLasttQuiz = async (db: IDBPDatabase): Promise<void> => {
  const tx = db.transaction(STORE_LASTQUIZ, "readwrite");
  await tx.store.clear();
  await tx.done;
};
export const clearResultQuiz = async (db: IDBPDatabase): Promise<void> => {
  const tx = db.transaction(STORE_RESULTQUIZ, "readwrite");
  await tx.store.clear();
  await tx.done;
};
export const getItemById = async (id: number) => {
  const db = await initDB();
  return db.transaction(STORE_QUIZ).objectStore(STORE_QUIZ).get(id);
};
