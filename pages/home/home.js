function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = '../../index.html';
    }).catch(() => {
        alert('Erro ao fazer o Logout');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        user.getIdToken().then(token => console.log(token))
        findTransactions(user)
    }
})

function newTransaction(){
    window.location.href = '../transaction/transaction.html'
}

findTransactions();

function findTransactions(user) {
    showLoading()
    transactionService.findByUser(user)
        .then(transactions => {
            hideLoading()
            addTransactionsToScreen(transactions);
        })
        .catch(error => {
            hideLoading()
            console.log('Erro ao recuperar transações', error);
        });
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        console.log(transaction)
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.id = transaction.uid
        li.addEventListener('click',() =>{
            window.location.href = '../transaction/transaction.html?uid=' + transaction.uid
        })

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Remover'
        deleteButton.classList.add('outline','danger')
        deleteButton.addEventListener('click',event=>{
            event.stopPropagation()
            askRemoveTransaction(transaction)
        })
        li.appendChild(deleteButton)

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function askRemoveTransaction(transaction){
    const showldRemove = confirm('Deseja remover a transação?')
    if(showldRemove){
        removeTransaction(transaction)
    }
}

function removeTransaction(transaction){
    showLoading()

    transactionService.remove(transaction)
        .then(()=>{
            hideLoading()

            document.getElementById(transaction.uid).remove()
        })
        .catch(error =>{
            hideLoading()

            console.log(error)
            alert('Erro ao remover tranzação')
        })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}