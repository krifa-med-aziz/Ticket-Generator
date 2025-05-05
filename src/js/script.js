'use strict';

const fullNameInput = document.querySelector('#Fullname');
const emailInput = document.querySelector('#email');
const avatarInput = document.querySelector('#avatar');
const nameOutput = document.querySelector('#name-output');
const emailOutput = document.querySelector('#email-output');

const ticketName = document.querySelector('#ticket-name');
const ticketCode = document.querySelector('#ticket_id');
const ticketUserAvatar = document.querySelector('#user_logo');

const formContainer = document.querySelector('#form_container');
const ticketContainer = document.querySelector('#ticket-container');
const generateBtn = document.querySelector('.generate_Btn');

const fullNameError = document.querySelector('#fullName_error');
const emailError = document.querySelector('#email_error');
const avatarError = document.querySelector('#avatar_error');

const uploadContent = document.querySelector('.upload-content');
const uploadBox = document.querySelector('#upload-box');

// Valide Form
let emailValid = false;
let nameValid = false;
let avatarFileValid = false;
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

  // check Avatar
  if (!avatarFileValid) {
    avatarError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Avatar required`;
    avatarError.classList.remove('hidden');
  }
  // check Fullname
  if (!nameValid) {
    fullNameError.innerHTML = `<i class="fa-solid fa-circle-info"></i>FullName required`;
    fullNameError.classList.remove('hidden');
  }

  // check email
  if (!emailValid) {
    emailError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Email invalid`;
    emailError.classList.remove('hidden');
  }

  if (emailValid && nameValid && avatarFileValid) {
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

avatarInput.addEventListener('change', () => {
  const avatarFile = avatarInput.files[0];
  if (!avatarFile) {
    avatarError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Upload an avatar`;
    avatarError.classList.remove('hidden');
    return;
  }
  // test image type
  if (
    !avatarFile.type.match('image/jpeg') &&
    !avatarFile.type.match('image/png')
  ) {
    avatarError.innerHTML = `<i class="fa-solid fa-circle-info"></i>Please upload a JPG or PNG image.`;
    avatarError.classList.remove('hidden');
    return;
  }
  // test image size (500KB max)
  if (avatarFile.size > 500 * 1024) {
    avatarError.innerHTML = `<i class="fa-solid fa-circle-info"></i>File size exceeds 500KB. Please upload a smaller image.`;
    avatarError.classList.remove('hidden');
    return;
  }
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadContent.innerHTML = ` 
                  <img
                      id="upload_avatar"
                      src="${e.target.result}"
                      alt="upload avatar"
                   />
                   <div class="avatar_btns">
                      <button class="avatar_btn" id="remove_image_btn">Remove image</button>
                      <button class="avatar_btn" id="change_image_btn">Change image</button>
                   </div>`;
      ticketUserAvatar.src = e.target.result;
      avatarInput.style.height = '0%';

      const removeImageBtn = document.querySelector('#remove_image_btn');
      const changeImageBtn = document.querySelector('#change_image_btn');

      removeImageBtn.addEventListener('click', function (e) {
        e.preventDefault();
        avatarInput.value = '';
        uploadContent.innerHTML = `
            <img
                id="upload_icon"
                src="./img/icon-upload.svg"
                alt="upload icon"
            />
            <p id="upload_text">Drag and drop or click to upload</p>`;
        ticketUserAvatar.src = '';
        avatarInput.style.height = '100%';
        avatarFileValid = false;
      });
      changeImageBtn.addEventListener('click', function (e) {
        e.preventDefault();
        avatarInput.click();
      });
    };
    reader.readAsDataURL(avatarFile);
    avatarError.classList.add('hidden');
    avatarFileValid = true;
  }
});

// Drag and Drop
uploadBox.addEventListener('dragenter', e => {
  e.preventDefault();
  uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragover', e => {
  e.preventDefault();
  uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', e => {
  e.preventDefault();
  uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', e => {
  e.preventDefault();
  uploadBox.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) {
    avatarInput.files = e.dataTransfer.files;
    const event = new Event('change'); // Trigger same behavior as change event
    avatarInput.dispatchEvent(event);
  }
});
