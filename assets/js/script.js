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

    // Create the row container
    var timeSlotRow = $('<section>');
    timeSlotRow.addClass('row time-block');

    // Create the time display section of the row
    var timeSlotTimeDisplay = $('<section>');
    timeSlotTimeDisplay.addClass('col-2 hour');
    timeSlotTimeDisplay.text(timeSlotMoment.format('hA'))

    // Create the event display section of the row
    var timeSlotTextContainer = $('<textarea>');
    timeSlotTextContainer.text(localStorage.getItem(hourID) || '')
    timeSlotTextContainer.addClass('col-8');

    // Save text for the calendar event to localStorage
    function setCalDetails(event) {
        event.preventDefault();
        localStorage.setItem(hourID,timeSlotTextContainer.val());
    }

    // Create the save section of the row
    var timeSlotSaveButton = $('<button>');
    timeSlotSaveButton.text('💾');
    timeSlotSaveButton.addClass('col-2 saveBtn');
    timeSlotSaveButton.on('click', setCalDetails);


    // Function to format elements based on time relative to current time
    // Removes all time-based classes and adds back the relevant one based on the current time
    function updateTimeColoring() {

        if (timeSlotMoment.hour() < moment().hour()) {
            // If the time slot is in the past...
            timeSlotTextContainer.removeClass('past');
            timeSlotTextContainer.removeClass('present');
            timeSlotTextContainer.removeClass('future');
            timeSlotTextContainer.addClass('past');
            console.log('Set past')
    
        } else if (timeSlotMoment.hour() > moment().hour()) {
            // If the time slot is in the future...
            timeSlotTextContainer.removeClass('past');
            timeSlotTextContainer.removeClass('present');
            timeSlotTextContainer.removeClass('future');
            timeSlotTextContainer.addClass('future');
            console.log('Set future')
    
        } else {
            // If time slot is not in the past or future, it must be the present!
            timeSlotTextContainer.removeClass('past');
            timeSlotTextContainer.removeClass('present');
            timeSlotTextContainer.removeClass('future');
            timeSlotTextContainer.addClass('present');
            console.log('Set present')
        };
        // console.log('Updated time slot coloring at '+moment().format(headerDateFormat))
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
for (var i=7;i<19;i++) {
    // Create times from 6am - 7pm
    addCalendarRow(moment().hour(i).minute(0).second(0))
};