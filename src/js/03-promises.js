import Notiflix from 'notiflix';

// Obtaining form elements
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

// Form Submitter Handler
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Cancel form submission

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  // Checking for the correctness of the entered data
  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure('Please enter valid numbers');
    return;
  }

  // Generation of promises
  for (let position = 1; position <= amount; position++) {
    const currentDelay = delay + (position - 1) * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

// Promise creation function
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      reject({ position, delay });
    }
  });
}
