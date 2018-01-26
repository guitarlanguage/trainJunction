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
      frequency: $frequencyInput
    };
    //push train data to database
    db.ref().push(train);
    //log the object data
    console.log(train.trainName);
    console.log(train.destination);
    console.log(train.firstTrainTime);
    console.log(train.frequency);

    // Alert
    // alert("New Train successfully added");
    //clear all of the checkboxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
db.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequencyInput;

  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTrainTime);
  // console.log(frequency);

  var militaryTime = moment.unix(firstTrainTime).format("MM:mm:ss");
  // console.log(militaryTime);

  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrainTime + "</td><td>" + frequency + "</td><td>");
});





    //display the inputed values into the Current Train Schedule panel
