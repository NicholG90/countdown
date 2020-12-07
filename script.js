$(document).ready(() => {

// Creating variables in global scope
let breakLength = null;
let endDate = null;

// Listening for click of the default buttons
// Would have liekd to use Jquery's $(this) to simplify this but couldn't find a way to parse the right value
$('.15').on('click', () => {
    countDownFunction(15, 0);
});
$('.30').on('click', () => {
  countDownFunction(30, 0);
});
$('.60').on('click', () => {
  countDownFunction(60, 0);
});

// Listening for click on form
$('form').on('submit', () => {
  // Stopping default action (refresh)
    event.preventDefault();
    // Running countDownFunction with values submitted in form
    countDownFunction($('#formBreakLengthMinutes').val(), $('#formBreakLengthHours').val());
});

// countDownFunction
const countDownFunction = function(breakSubmissionMinutes, breakSubmissionHours) {
    // Turn submitted values into seconds & setting variable
    breakLength = (breakSubmissionMinutes * 60) + (breakSubmissionHours * 3600);
    // Hiding Form
    $('form, .defaults').hide(400);
    // Showing Countdown Timer
    $('.countdown').show(400).css('display', 'flex');

    
    endDate = ((Date.now() / 1000) + breakLength)

    // use setInterval function to refresh countdown every second
    const timer = setInterval(function() {

        const currentDate = Date.now() / 1000
        const dateDifference = (endDate - currentDate)
        // Convert breakLength into Hours/Minutes/Seconds
        let breakLengthSeconds = Math.floor(dateDifference % 60);
        let breakLengthMinutes = Math.floor(dateDifference / 60) % 60;
        let breakLengthHours = Math.floor(dateDifference / 3600);

        // Inserting countdown timer into HTML
        $('.hours').html(`${breakLengthHours} Hours`);
        $('.minutes').html(`${breakLengthMinutes} Minutes`);
        $('.seconds').html(`${breakLengthSeconds} Seconds`);

        // Inserting End Date into HTML
        let humanEndDate = new Date(endDate * 1000)
        $('.endTime').html(`Make sure you're back by ${humanEndDate.toLocaleTimeString()}`);

        // Update the browsers tab to reflect the current time  + "Minutes Left!"
        $('title').text(breakLengthMinutes + " Minutes Left!");

        // Statement to change background colour depending on minutes left on the timer
        if (dateDifference < 300) {
          $('body').css({
            'transition': 'background-color 2s ease-in-out',
            'background-color': '#FC4A1A'
            });
        } else if (dateDifference < 600) {
          $('body').css({
                'transition': 'background-color 2s ease-in-out',
                'background-color': '#F7B733'
            });
        } else {
          $('body').css('background','#4ABDAC');
        }

        // Statement to stop timer when it reaches 0 and let user know!
        if (breakLengthMinutes === 0 && breakLengthSeconds === 0) {
          clearInterval(timer);
          $('.hideAtEnd').slideUp(1000)
          $('.backToWork').slideDown(1000).html('<img src="./assests/getbacktowork.gif" alt=""></img>')
        }
      },1000);
};

// listen to click to add button and add 60 seconds to endDate
$('#add').on('click', () => {
  endDate = endDate + 60;
});

});