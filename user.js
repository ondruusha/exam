const transactionsKey = 'transactions';

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const tableBody = document.querySelector('#transactionsTable tbody');
    tableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.transaction_id}</td>
            <td>${transaction.card_number}</td>
            <td>${transaction.atm_number}</td>
            <td>${transaction.date_time.replace('T', ' ')}</td>
            <td>${transaction.commission ? 'Да' : 'Нет'}</td>
            <td>${transaction.amount}</td>
        `;
        tableBody.appendChild(row);
    });
}

loadTransactions();