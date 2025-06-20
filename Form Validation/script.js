const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateName() && validateEmail() && validatePassword()) {
        alert("Form Submitted Successfully");
    }
});


function validateName() {
    let name = document.getElementById('name').value;

    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        nameError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "Write full Name";
        nameError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    nameError.innerHTML = "";
    nameError.previousElementSibling.classList.add('fa-check');
    return true;
}

function validateEmail() {
    let email = document.getElementById('email').value;

    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        emailError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Enter Valid Email";
        emailError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    emailError.innerHTML = "";
    emailError.previousElementSibling.classList.add('fa-check');
    return true;
}
function validatePassword() {
    let password = document.getElementById('password').value;

    if (password.length == 0) {
        passError.innerHTML = "Password is required";
        passError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)) {
        passError.innerHTML = "Enter Strong Password & At least 8 characters";
        passError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    passError.innerHTML = "";
    passError.previousElementSibling.classList.add('fa-check');
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const submitBtn = document.getElementById('submitBtn');

    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validator: validateName
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validator: validateEmail
        },
        password: {
            input: document.getElementById('password'),
            error: document.getElementById('passError'),
            validator: validatePassword
        }
    };

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;

        for (let key in fields) {
            const valid = fields[key].validator(fields[key].input, fields[key].error);
            if (!valid) isValid = false;
        }

        if (isValid) {
            alert("Form Submitted Successfully");
        }
    });

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        errorElement.textContent = "";
    }
    
    function validateName(input, errorElement) {
        const name = input.value.trim();
        const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;

        if (!name) {
            showError(input, errorElement, "Name is required");
            return false;
        }
        if (!fullNameRegex.test(name)) {
            showError(input, errorElement, "Write full name");
            return false;
        }

        clearError(input, errorElement);
        return true;
    }

    function validateEmail(input, errorElement) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showError(input, errorElement, "Email is required");
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(input, errorElement, "Enter a valid email");
            return false;
        }

        clearError(input, errorElement);
        return true;
    }

    function validatePassword(input, errorElement) {
        const password = input.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,30}$/;

        if (!password) {
            showError(input, errorElement, "Password is required");
            return false;
        }
        if (!passwordRegex.test(password)) {
            showError(input, errorElement, "Enter a strong password with at least 8 characters");
            return false;
        }

        clearError(input, errorElement);
        return true;
    }
});
