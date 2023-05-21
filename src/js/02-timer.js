import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Interface elements
const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

// Initializing flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Timer start function
function startTimer() {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);

  updateCountdown(); // Call the function at once to avoid a delay of the first update

  function updateCountdown() {
    const timeDifference = selectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success("Countdown complete!");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }
}

// Function for converting milliseconds into days, hours, minutes and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function for adding a leading zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// The "Start" button click handler
startButton.addEventListener('click', startTimer);
