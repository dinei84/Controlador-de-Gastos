const form = {
    date: () => document.getElementById('date'),
    currency: () => document.getElementById('currency'),
    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),
    description: () => document.getElementById('description'),
    dateRequireError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequireError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequireError: () => document.getElementById('transaction-type-required-error'),
    saveButton: () => document.getElementById('save-button')
}

getTransactionUid()

if(!isNewTransaction()){
    const uid = getTransactionUid()
    findTransactionsByUid(uid)
}

function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('uid')
}

function isNewTransaction(){
    return getTransactionUid() ? false : true
}

function findTransactionsByUid(uid){
    //showLoading()

    transactionService.findByUid(uid)
        .then(transaction => {
            hideLoading()
            if(transaction){
                fillTransactionScreen(transaction)
                toggleSaveButtonDisable()
            }else{
                alert('Documento não encontrado')
                window.location.href = '../home/home.html'
            }
        })
        .catch(()=>{
            hideLoading()
            alert('Erro ao recuperar documento')
            window.location.href = '../home/home.html'
        })
}

function fillTransactionScreen(transaction) {
    if (transaction.type == 'expense') {
      form.typeExpense().checked = true;
    } else {
      form.typeIncome().checked = true;
    }

    form.date().value = transaction.date
    form.currency().value = transaction.money.currency
    form.value().value = transaction.money.value
    form.transactionType().value = transaction.transactionType

    if(transaction.description){
        form.description().value = transaction.description
    }
}

function saveTransaction(){
    //showLoading()

    const transaction = createTransaction()
    
    if(isNewTransaction()){
        save(transaction)
    }else{
        update(transaction)
    }
}

function save(transaction){
    transactionService.save(transaction)
        .then(()=>{
            hideLoading()
            window.location.href = '../home/home.html'
        })
        .catch(()=>{
            hideLoading()
            alert('Erro ao salvar transação')
        })
}

function update(transaction){
    //showLoading()
      
    const uid = getTransactionUid(); 
    transactionService.update(transaction, uid)
        .then(()=>{
            hideLoading()
            window.location.href = '../home/home.html'
        })
        .catch(()=>{
            hideLoading()
            alert('Erro ao atualizar transação')
        })
}

function createTransaction(){
    return {
        type: form.typeExpense().checked ? 'expense' : 'income',
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
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