const form = {
    date: () => document.getElementById('date'),
    dateRequireError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequireError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequireError: () => document.getElementById('transaction-type-required-error'),
    saveButton: () => document.getElementById('save-button')
}


function onChangeDate(){
    const date = form.date().value
    form.dateRequireError().style.display = !date ? 'block' : 'none'

    toggleSaveButtonDisable()
}

function onchangeValue(){
    const value = form.value().value
    form.valueRequireError().style.display = !value ? 'block' : 'none'

    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? 'block' : 'none'

    toggleSaveButtonDisable()
}

function onChangeTransactionType(){
    const transactionType = form.transactionType().value
    console.log(transactionType)
    form.transactionTypeRequireError().style.display = !transactionType ? 'block' : 'none'

    toggleSaveButtonDisable()
}

function toggleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid()
}

function isFormValid(){
    const date = form.date().value
    if(!date){
        return false
    }

    const value = form.value().value
    if(!value){
        return false
    }

    const transactionType = form.transactionType().value
    if(!transactionType){
        return false
    }
    return true
}