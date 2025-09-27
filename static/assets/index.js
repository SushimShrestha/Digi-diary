//get current date, predict emotion, save entry//
var date = new Date()
//gives us the date in readable format//
var display_date = "Date: " + date.toLocaleDateString()
//creating an undefined variable for the predicted emotion
var predicted_emotion;

//getting the webpage ready
$(document).ready(function () { 
    $("#display_date").html(display_date)
    //disable the save button as we don't have any entries
    $("#save_button").prop("disabled", true) 
})

//create function for predicting emotions
$(function () {
    $("#predict_button").click(function () {
        var input_data = {
            //val()= gets entered value
            "text": $("#text").val()     
        }
        $.ajax({
            type: "POST",
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $("#prediction").html(result.data.predicted_emotion)
                $("#emo_img_url").attr("src", result.data.predicted_emotion_img_url)
                $("#prediction").css("display", "")
                $("#emo_img_url").css("display", "")
                predicted_emotion = result.data.predicted_emotion
                
            },
            error: function (result) {
                alert(result.responseJSON.message)
            },

        })
    })
})

//create function for save button
$(function () {
    $("#save_button").click(function () {
        var saved_data = {
            "date":display_date,
            "text": $("#text").val(),
            "emotion":predicted_emotion
            
        }
        $.ajax({
            type: "POST",
            url: "/save-entry",
            data: JSON.stringify(saved_data),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                alert("Your entry has been saved succesfully.")
                window.location.reload()
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
    })
    })
})

