function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
}

function toggleButtonDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.recoverPassword().disabled = !emailValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    loginButton: () => document.getElementById('login-button'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    passwordRequiredError: () => document.getElementById('password-required-error')
};

// // Função de validação de email (exemplo simples)
// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }

// function login() {
//     // Lógica para login
//     console.log("Login executado");
// }
