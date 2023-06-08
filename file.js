const submitButton = document.querySelector(".submit-button");
const popUpBox = document.querySelector(".pop-up");
const closeButton = document.querySelector(".close-pop-up");
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const ids = ['username', 'email', 'password', 'confirm-password'];
const messages = {
    'username': 'Username must be between 3 and 25 characters', 
    'email': 'Must be a valid email address',
    'password': 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character.', 
    'confirm-password': 'Please enter the password again',
};

const conditionCheck = {
    'username': function(input) {
        return input.length >= 3 && input.length <= 25;
    },
    'email': function(input) {
        return input.length && validEmailRegex.test(input); 
    },
    'password': function(input) {
        return validPasswordRegex.test(input);
    },
    'confirm-password': function(input) {
        const pass = document.querySelector("#password").value;
        return pass && input === pass;
    }
}

const formValidation = (id) => {
    const input = document.querySelector(`#${id}`);
    const existingErrorMessage = document.querySelector(`.${id}-error`);

    if (existingErrorMessage) {
        existingErrorMessage.remove(); // Remove any existing error message
    }

    if (!conditionCheck[id](input.value)) {
        input.classList.add('error-highlight');
        input.classList.remove('valid-highlight');
        const errorMessage = document.createElement('span');
        errorMessage.classList.add(`${id}-error`);
        errorMessage.innerText = `${messages[id]}`;
        input.insertAdjacentElement('afterend', errorMessage);
    } else {
        input.classList.remove('error-highlight');
        input.classList.add("valid-highlight");
    }
};

const checkFormValidity = () => {
    let validForm = true;
    ids.forEach((id) => {
      if (document.querySelector(`.${id}-error`)) {
        validForm = false;
      }
    });

    submitButton.disabled = !validForm;
}

ids.forEach((id) => {
    const input = document.querySelector(`#${id}`);
    input.addEventListener('input', () => {
        formValidation(id);
        checkFormValidity();
    });
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    popUpBox.classList.remove('display-hidden');
});

closeButton.addEventListener('click', () => {
    popUpBox.classList.add('display-hidden');
});

document.querySelector("#show-password").addEventListener("click", () => {
    const passwordInput = document.querySelector("#password");
    const eyeIcon = document.querySelector("#show-password");
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
});

document.querySelector("#show-confirm-password").addEventListener("click", () => {
    console.log("hello");
    const passwordInput = document.querySelector("#confirm-password");
    const eyeIcon = document.querySelector("#show-confirm-password");
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
});
