import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input');
const inputMessage = document.querySelector('textarea');

let data = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    data = {
      email: parsedData.inputEmail || '',
      message: parsedData.inputMessage || '',
    };
  } catch (error) {
    console.error('Error al analizar el JSON:', error);
  }
}

inputEmail.value = data.email;
inputMessage.value = data.message;

inputEmail.addEventListener('input', throttle(saveData, 500));
inputMessage.addEventListener('input', throttle(saveData, 500));

function saveData() {
  data.email = inputEmail.value;
  data.message = inputMessage.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

form.addEventListener('submit', send);

function send(event) {
  event.preventDefault();
  form.reset();
  console.log(data);
  localStorage.removeItem('feedback-form-state');
}
