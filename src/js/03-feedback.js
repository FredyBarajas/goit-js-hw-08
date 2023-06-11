import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

let data = {
  inputEmail: '',
  inputMessage: '',
};

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    data = {
      inputEmail: parsedData.inputEmail || '',
      inputMessage: parsedData.inputMessage || '',
    };
  } catch (error) {
    console.error('Error al analizar el JSON:', error);
  }
}

email.value = data.inputEmail;
message.value = data.inputMessage;

email.addEventListener('input', throttle(saveData, 500));
message.addEventListener('input', throttle(saveData, 500));

function saveData() {
  data.inputEmail = email.value;
  data.inputMessage = message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

form.addEventListener('submit', send);

function send(event) {
  event.preventDefault();
  form.reset();
  console.log(data);
  localStorage.removeItem('feedback-form-state');
}
