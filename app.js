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
    var $destination = $("#destination-input").val().trim();
    var $firstTrainTime = $("#first-train-time-input").val().trim();
    var $frequencyInput = $("#frequency-input").val().trim();


    // Creates local "temporary" object for holding train data
    var train = {
        trainName: $trainName,
        destination: $destination,
        firstTrainTime: $firstTrainTime,
        frequency: $frequencyInput,
        //possibly don't need the timestamp
        // dateAdded: firebase.database.ServerValue.TIMESTAMP;

    };
    //push train data to database
    db.ref().push(train);
    //log the object data
    console.log(train.trainName);
    console.log(train.destination);
    console.log(train.firstTrainTime);
    console.log(train.frequency);
    console.log(train.dateAdded);

    // Alert
    // alert("New Train successfully added");
    //clear all of the checkboxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
// var tickToc = db.ref().on("child_added", function(childSnapshot, prevChildKey) {
db.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrainTime);
    // console.log(frequency);


    // convert train times
    var firstTrainTimeConverted = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("First train time: " + firstTrainTimeConverted);
    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);


    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var remainingTime = diffTime % childSnapshot.val().frequency;
    console.log("remaining time: " + remainingTime);

    var trainArrivesIn = frequency - remainingTime;
    console.log("your train arrives in: " + trainArrivesIn);

    var nextTrainArrival = moment().add(trainArrivesIn, "minutes");

    var nextArrivalConverted = moment(nextTrainArrival).format("HH:mm");
    console.log(nextArrivalConverted);

    var minsAway = nextArrivalConverted


    // Add each train's data into the table
    $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextArrivalConverted  + "</td><td>" + trainArrivesIn + "</td>");
});

// function myFunction() {
//     tickTocK= setInterval(alertFunc, 3000);
// }




    //display the inputed values into the Current Train Schedule panel
