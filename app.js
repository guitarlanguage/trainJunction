// Initialize Firebase
var config = {
  apiKey: "AIzaSyDtxatiN1bHHmlIYu9G72T5F4SrcDqB45Y",
  authDomain: "train-junction.firebaseapp.com",
  databaseURL: "https://train-junction.firebaseio.com",
  projectId: "train-junction",
  storageBucket: "train-junction.appspot.com",
  messagingSenderId: "1030567413833"
};
firebase.initializeApp(config);
//creating database variable
var db = firebase.database();
//caching jquery objects
var $scheduleTable = $("#shedule-table");
