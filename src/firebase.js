import firebase from "firebase/app"; // rollup bundle issue with ESM import
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhvu01irK5L0cBV-BpD60QO584MCtEosY",
  authDomain: "inventarioconstructora.firebaseapp.com",
  databaseURL: "https://inventarioconstructora.firebaseio.com",
  projectId: "inventarioconstructora",
  storageBucket: "inventarioconstructora.appspot.com",
  messagingSenderId: "1018493948173",
  appId: "1:1018493948173:web:948f05ee871c3743df6044",
  measurementId: "G-Q47X7GZVGL",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
//! deactrivate emulator
auth.useEmulator("http://localhost:9099");
export const db = app.firestore();
db.useEmulator("localhost", 8080);
const rtdb = app.database();
rtdb.useEmulator("localhost", 9000);
export const rt = rtdb.ref();

/**
 * * si se traban lo puertos limpiar con :
 * ! search $PORT process 
 * ? netstat -ano | findstr :5001
 * * Protocol localAddress RemoteAddress Estado PID
 * ! matar el proceso $PID
 * ? taskkill /F /PID 2564
 */