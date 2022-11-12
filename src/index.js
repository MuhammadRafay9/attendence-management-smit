import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSxBf7Q_kzOBaLPw716IG1ARCJOiDDI9A",
  authDomain: "attendence-management-smit.firebaseapp.com",
  projectId: "attendence-management-smit",
  storageBucket: "attendence-management-smit.appspot.com",
  messagingSenderId: "81140083408",
  appId: "1:81140083408:web:682eea5a6d0deb62dd4cd5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
