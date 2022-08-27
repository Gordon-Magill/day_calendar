// Display the current time at the top of the page every minute
var headerDateFormat = 'ddd MMM Do - HH:mm'
$("#currentDay").text(moment().format(headerDateFormat))
setInterval(function (){
    $("#currentDay").text(moment().format(headerDateFormat))
},60000)


