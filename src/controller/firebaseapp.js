import * as firebase from 'firebase';

//initialize firebase app and export it
var config = {
    apiKey: "AIzaSyB_JYH0IPUPgO622DTwpqYnxBk2LATWw8Q",
    authDomain: "monstertask-770c7.firebaseapp.com",
    databaseURL: "https://monstertask-770c7.firebaseio.com",
    projectId: "monstertask-770c7",
    storageBucket: "monstertask-770c7.appspot.com",
    messagingSenderId: "276881446898",
    appId: "1:276881446898:web:968efddd5eb6597f133d6b",
    measurementId: "G-MN6H1R8PQ6"

};
//app provides access to firebase services
export var app = firebase.initializeApp(config);