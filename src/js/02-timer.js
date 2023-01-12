import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startButton = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');
let chosenDate = {};

const calendar = flatpickr('#datetime-picker', {
  position: 'above left',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    chosenDate = selectedDates;
    if (selectedDates[0].getTime() < Date.now()) {
      startButton.setAttribute('disabled', true);
      Report.info('Please choose a date in the future', '', 'Close');
    } else if (selectedDates[0].getTime() >= Date.now()) {
      startButton.removeAttribute('disabled');
    }
  },
});

function onClickRunTimer(e) {
  startButton.setAttribute('disabled', true);
  input.disabled = true;
  const intervalId = setInterval(() => {
    const difference = chosenDate[0] - Date.now();

    if (difference <= 0) {
      clearInterval(intervalId);
      return;
    }

    let { days, hours, minutes, seconds } = convertMs(difference);

    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minutesTimer.textContent = addLeadingZero(minutes);
    secondsTimer.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(difference) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(difference / day);
  const hours = Math.floor((difference % day) / hour);
  const minutes = Math.floor(((difference % day) % hour) / minute);
  const seconds = Math.floor((((difference % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

startButton.addEventListener('click', onClickRunTimer);
