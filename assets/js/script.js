// Display the current time at the top of the page
var headerDateFormat = 'ddd MMM Do - HH:mm'
var currentTime = moment().format(headerDateFormat)
$("#currentDay").text(currentTime)

// Refresh page header every minute
setInterval(function (){
    // Update header time
    currentTime = moment().format(headerDateFormat)
    $("#currentDay").text(currentTime)
},60000)

// Create a single row of the calendar
function addCalendarRow(timeSlotMoment) {

    // Create a unique ID for the HTML elements that correspond to this hour block
    var hourID = 'timeSlot'+timeSlotMoment.hour();
    // console.log(hourID);

    // Create the row container
    var timeSlotRow = $('<section>');
    timeSlotRow.addClass('row');

    // Create the time display section of the row
    var timeSlotTimeDisplay = $('<section>');
    timeSlotTimeDisplay.addClass('col-2 hour');
    timeSlotTimeDisplay.text(timeSlotMoment.format('hA'))

    // Create the event display section of the row
    var timeSlotTextContainer = $('<textarea>');
    timeSlotTextContainer.addClass('col-9 time-block');

    // Create the save section of the row
    var timeSlotSaveButton = $('<img>');
    timeSlotSaveButton.addClass('col-1 saveBtn');
    // timeSlotSaveButton.attr('type','image');
    // timeSlotSaveButton.attr('height','24px');
    timeSlotSaveButton.attr('src','./assets/images/floppy-icon.png')

    // // Create the actual button for saving content
    // var saveButton = $('<button>')

    // Function to format elements based on time relative to current time
    function updateTimeColoring() {
        if (timeSlotMoment.isBefore(moment().minute(0).second(0))) {
            // If the time slot is in the past...
            timeSlotTextContainer.removeClass(['past','present','future']);
            timeSlotTextContainer.addClass('past');
    
        } else if (timeSlotMoment.isAfter(moment().minute(0).second(0))) {
            // If the time slot is in the future...
            timeSlotTextContainer.removeClass(['past','present','future']);
            timeSlotTextContainer.addClass('future');
    
        } else {
            // If time slot is not in the past or future, it must be the present!
            timeSlotTextContainer.removeClass(['past','present','future']);
            timeSlotTextContainer.addClass('present');
        };
        console.log('Updated time slot coloring at '+moment().format(headerDateFormat))
    }

    // Update the coloring immediately and continue comparisons every minute
    updateTimeColoring()
    setInterval(updateTimeColoring,60000);

    // Add elements to the row
    timeSlotRow.append(timeSlotTimeDisplay);
    timeSlotRow.append(timeSlotTextContainer);
    timeSlotRow.append(timeSlotSaveButton)

    // Append the fleshed out time slot to the container
    $('.container').append(timeSlotRow);
}

// Create the calendar rows for the entire day
for (var i=0;i<14;i++) {
    // Create times from 6am - 7pm
    addCalendarRow(moment().hour(6+i).minute(0).second(0))
};






// var newTimeSlot = $('<section>');
// newTimeSlot


// Create replicate time slots
