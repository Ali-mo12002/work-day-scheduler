// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



$(function () {
  // Get the current date and format it
  var currentday = $("#currentDay");
  dayjs().format('[dddd/MMMM/DD')
  var rightNow = dayjs().format('dddd, MMMM DD');
  currentday.text(rightNow);
  var currenthour = new Date().getHours();
  // Get the current hour

  // Function to update the styling of time blocks based on the current hour
  function updatehours() {
    $('.time-block').each(function() {       // Iterate over each time block element
        var id = $(this).attr('id');   // Get the ID of the current time block
        if (id) {   // Check if the ID exists
            var hourVal = parseInt(id.split('-')[1]);// Extract hour value correctly
            if (!isNaN(hourVal)) {   // Check if the extracted value is a valid number
              if (hourVal < currenthour) {
                // If the hour has passed, add 'past' class and disable textarea
                $(this).removeClass('future present').addClass('past');
                $(this).find('.description').prop('disabled', true); // Disable textarea for past time blocks
            } else if (hourVal > currenthour) {
                // If the hour is in the future, add 'future' class
                $(this).removeClass('past present').addClass('future');
            } else {
                // If the hour is the current hour, add 'present' class
                $(this).removeClass('past future').addClass('present');
            }
            }
        }
    });
}

  // Call the updatehours function initially and every 60 seconds
  updatehours();
  setInterval(updatehours, 60000);
  // Log the current hour to the console
  console.log(currenthour);
  // Click event handler for the save button to save user input in local storage
  $('.saveBtn').on('click', function() {
    var hourId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(hourId, userInput);
  });
  // Retrieve saved user input from local storage and set textarea values
  $('.time-block').each(function() {
    var hourId = $(this).attr('id');
    var savedInput = localStorage.getItem(hourId);
    $(this).find('.description').val(savedInput);
  });
});
