import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputForm = document.querySelector('form');

function onInputGetValue(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delay += step;
    }
    createPromise(i, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

inputForm.addEventListener('submit', onInputGetValue);
