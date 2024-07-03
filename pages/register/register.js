function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    toggleRegisterButton();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none' : 'block';
    toggleRegisterButton();
}

function onChangeConfirmPassword() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? 'none' : 'block';
    toggleRegisterButton();
}

function toggleRegisterButton() {
    const emailValid = form.email().value && validateEmail(form.email().value);
    const passwordValid = form.password().value && form.password().value.length >= 6;
    const passwordsMatch = form.password().value === form.confirmPassword().value;
    
    const allValid = emailValid && passwordValid && passwordsMatch;
    document.getElementById('registerButton').disabled = !allValid;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error')
};