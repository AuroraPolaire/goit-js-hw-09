const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let colorChangeIntId = '';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStartColorChange(e) {
  colorChangeIntId = setInterval(() => {
    startButton.setAttribute('disabled', true);
    stopButton.removeAttribute('disabled');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopColorChange(e) {
  clearInterval(colorChangeIntId);
  stopButton.setAttribute('disabled', true);
  startButton.removeAttribute('disabled');
}

startButton.addEventListener('click', onClickStartColorChange);
stopButton.addEventListener('click', onClickStopColorChange);
