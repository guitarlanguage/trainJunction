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
var $scheduleTable = $("#schedule-table");

// Capture add a train Button Click
$("#add-train-btn-submit").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();
    //creating a variable and grabbing the text value for the desired train name
    var $trainName = $("#train-name-input").val().trim();
    console.log($trainName);

    var $destination = $("#destination-input").val().trim();
    console.log($destination);

    var $firstTrainTime = $("#first-train-time-input").val().trim();
    console.log($firstTrainTime);

    var $frequencyInput = $("#frequency-input").val().trim();
    console.log($frequencyInput);



});
