'use strict';

// write your code here
const logo = document.querySelector('.logo');

// Create promise2 immediately, so it starts rejecting after 2 seconds
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('reject'));
  }, 2000);
});

// Create promise1 which resolves on logo click
const promise1 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve('logo clicked');
  });
});

// Use Promise.allSettled to handle both
Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((result) => {
    if (result.status === 'rejected') {
      const errorMessage = document.createElement('div');

      errorMessage.classList.add('message', 'error-message');
      document.body.append(errorMessage);
      errorMessage.textContent = 'Promise was rejected!';
    }

    if (result.status === 'fulfilled') {
      const message = document.createElement('div');

      message.classList.add('message');
      document.body.append(message);
      message.textContent = 'Promise was resolved!';
    }
  });
});
