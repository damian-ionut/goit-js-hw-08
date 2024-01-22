import _throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const INPUT_EMPTY_VALUE = '';

function saveState() {
  const feedback = getFormValues();
  saveToLocalStorage(feedback);
}

function getFormValues() {
  const { elements: { email, message } } = form;
  return {
    email: email.value,
    message: message.value,
  };
}

function saveToLocalStorage(feedback) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedback));
}

function loadFromLocalStorage() {
  const storedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storedData) {
    const feedback = JSON.parse(storedData);
    setFormValues(feedback);
  }
}

function setFormValues(feedback) {
  const { elements: { email, message } } = form;
  email.value = feedback.email || INPUT_EMPTY_VALUE;
  message.value = feedback.message || INPUT_EMPTY_VALUE;
}

function handleSubmit(event) {
  event.preventDefault();
  const feedback = getFormValues();
  console.log('Submitted:', feedback);
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

form.addEventListener('input', _throttle(saveState, 500));
form.addEventListener('submit', handleSubmit);

window.addEventListener('load', loadFromLocalStorage);