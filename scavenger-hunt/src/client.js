import * as sapper from '@sapper/app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'hammerjs';

import { getUserId } from './stores/user';

const config = {
    apiKey: 'AIzaSyDpVHAOqxwi416LZQ2vjkCgTN_Cfz5DWcg',
    authDomain: 'webpage-jgero.firebaseapp.com',
    projectId: 'webpage-jgero',
    storageBucket: 'webpage-jgero.appspot.com',
    messagingSenderId: '520302201493',
    appId: '1:520302201493:web:376e268e02a9eeec24299c',
};
// client side app has started
firebase.initializeApp(config);

let userId;

sapper.start({
    target: document.querySelector('body'),
});
