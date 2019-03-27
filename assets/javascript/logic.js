
$(document).ready(function(){
//Initialize Firebase
var config = {
    apiKey: "AIzaSyC8TJNufGf15bsZnpHHLMT2vcdrwQMQUy0",
    authDomain: "train-schedule-32253.firebaseapp.com",
    databaseURL: "https://train-schedule-32253.firebaseio.com",
    projectId: "train-schedule-32253",
    storageBucket: "train-schedule-32253.appspot.com",
    messagingSenderId: "306023997764"
    };
    firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var frequency = 0;
var trainTime = "";

//click on button to add train
$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    //take user input 
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFrequency = parseInt($("#frequency").val().trim());
    var trainTime = $("#traintime").val().trim();
    $("#formfield").val("");
    //store user input in local variable
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        Time: trainTime
    };
   // upload the train data to firebase database
    database.ref().push(newTrain);

   //clearing out the input field

    $("#name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#traintime").val("");

    return false
});

database.ref().on("child_added", function (response) {
    var data = response.val();
    console.log(data);
    var newTrainname = data.name
    var newTraintime = data.Time
    var newFrequency = data.frequency
    var newDestination = data.destination;
    //console log time

    console.log(newTrainname);
    console.log(newTraintime);
    console.log(newFrequency);
    console.log(newDestination);

    var firstTimeConverted = moment(newTraintime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

   

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = newFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + arrivalTime);

   

    $("tbody").append("<tr><td>" + newTrainname+ "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "min" + "</td></tr>");
}, function (errorobject) {
    console.log("Error object: " + errorobject.code)
});

});

