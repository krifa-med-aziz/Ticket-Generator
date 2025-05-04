'use strict';

const fullNameInput = document.querySelector('#Fullname');
const emailInput = document.querySelector('#email');
const nameOutput = document.querySelector('#name-output');
const emailOutput = document.querySelector('#email-output');
const ticketName = document.querySelector('#ticket-name');
const ticketCode = document.querySelector('#ticket_id');

const formContainer = document.querySelector('#form_container');
const ticketContainer = document.querySelector('#ticket-container');
const generateBtn = document.querySelector('.generate_Btn');

const fullNameError = document.querySelector('#fullName_error');
const emailError = document.querySelector('#email_error');
const avatarError = document.querySelector('#avatar_error');

// Valide Form
let emailValid = false;
let nameValid = false;
fullNameInput.addEventListener('keyup', () => {
  const words = fullNameInput.value.trim().split(/\s+/);
  if (fullNameInput.value === '' || !(words.length >= 2)) {
    fullNameError.innerHTML = `<i class="fa-solid fa-circle-info"></i>FullName required`;
    fullNameError.classList.remove('hidden');
    fullNameInput.style.borderColor = 'red';
  } else {
    fullNameError.classList.add('hidden');
    fullNameInput.style.borderColor = 'green';
    nameValid = true;
  }
});

emailInput.addEventListener('keyup', () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(emailInput.value) || emailInput.value === '') {
    emailError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Email invalid`;
    emailError.classList.remove('hidden');
    emailInput.style.borderColor = 'red';
  } else {
    emailError.classList.add('hidden');
    emailInput.style.borderColor = 'green';
    emailValid = true;
  }
});

// Generate random code
const randomCode = () => {
  const randomNumber = Math.ceil(Math.random() * 100000);
  return `#${randomNumber}`;
};

// Generate Ticket
generateBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (!emailValid) {
    emailError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Email invalid`;
    emailError.classList.remove('hidden');
  }
  if (!nameValid) {
    fullNameError.innerHTML = `<i class="fa-solid fa-circle-info"></i>FullName required`;
    fullNameError.classList.remove('hidden');
  }
  if (emailValid && nameValid) {
    formContainer.classList.add('hidden');
    ticketContainer.classList.remove('hidden');
    const fullName = fullNameInput.value.split(' ');
    const capitalized = fullName
      .map(name => name[0].toUpperCase() + name.slice(1))
      .join(' ');
    nameOutput.textContent = capitalized;
    ticketName.textContent = capitalized;
    emailOutput.textContent = emailInput.value;
    ticketCode.textContent = randomCode();
  }
});
