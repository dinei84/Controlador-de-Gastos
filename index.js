function validateField() {
    toggleButtonDisable()
    toggleEmailErrors()
}

function isEmailValid(){
    const email = document.getElementById('email').value;
    if(!email){
        return false
    }
    return validateEmail(email)
}

function toggleEmailErrors(){
    const email = document.getElementById('email').value
    if(!email){
        //email obrigatorio
        document.getElementById('email-required-error').style.display ='block';
    }
}
function toggleButtonDisable(){
    const emailValid =isEmailValid()
    document.getElementById('recover-password-button').disabled = !emailValid; 
    
    const passwordValid = isPasswordValid()
    document.getElementById('login-button').disabled = !disabled || !passwordValid
}

function isPasswordValid(){
    const password = document.getElementById('password').value
    if(!password){
        return false
    }
    return true
} 


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
