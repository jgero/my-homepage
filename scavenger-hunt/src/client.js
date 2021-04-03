import * as sapper from '@sapper/app';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'hammerjs';

const config = {
  apiKey: 'AIzaSyDpVHAOqxwi416LZQ2vjkCgTN_Cfz5DWcg',
  authDomain: 'webpage-jgero.firebaseapp.com',
  projectId: 'webpage-jgero',
  storageBucket: 'webpage-jgero.appspot.com',
  messagingSenderId: '520302201493',
  appId: '1:520302201493:web:376e268e02a9eeec24299c',
};

firebase.initializeApp(config);

sapper.start({
  target: document.querySelector('#sapper'),
});
