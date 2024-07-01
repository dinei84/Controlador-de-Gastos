function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = document.getElementById('email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() {
    const email = document.getElementById('email').value;
    const emailRequiredError = document.getElementById('email-required-error');
    if (!email) {
        // email obrigatorio
        emailRequiredError.style.display = 'block';
    } else {
        emailRequiredError.style.display = 'none'
    }

    if(validateEmail(email)){
        document.getElementById('email-invalid-error').style.display = 'none'
    }else{
        document.getElementById('email-invalid-error').style.display = 'block'
    }
}

function togglePasswordErrors(){
    const password = document.getElementById('password').value

    if(!password){
        document.getElementById('password-required-error').style.display = 'block'
    }else{
        document.getElementById('password-required-error').style.display = 'none'
    }
}

function toggleButtonDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    document.getElementById('recover-password-button').disabled = !emailValid;
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
