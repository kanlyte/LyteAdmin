import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYCWCziGPeb_qPt_bdH0QyguN63XIWlbM",
  authDomain: "plus17.firebaseapp.com",
  projectId: "plus17",
  databaseURL: "gs://plus17.appspot.com",
  storageBucket: "plus17.appspot.com",
  messagingSenderId: "205037490796",
  appId: "1:205037490796:web:3949cc96872aa8b6c2fe49",
  measurementId: "G-W3HMV40MV5",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
