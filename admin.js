const transactionsKey = 'transactions';

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const tableBody = document.querySelector('#transactionsTable tbody');
    tableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.transaction_id}</td>
            <td>${transaction.card_number}</td>
            <td>${transaction.atm_number}</td>
            <td>${transaction.date_time.replace('T', ' ')}</td>
            <td>${transaction.commission ? 'Да' : 'Нет'}</td>
            <td>${transaction.amount - (transaction.commission || 0)}</td>
            <td>
                <button onclick="editTransaction(${index})">Редактировать</button>
                <button onclick="deleteTransaction(${index})">Удалить</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addTransaction() {
    const card_number = document.getElementById('card_number').value;
    const atm_number = document.getElementById('atm_number').value;
    const date_time = document.getElementById('date_time').value;
    const commission = document.getElementById('commission').value === 'true';
    const amount = document.getElementById('amount').value;
    const commissionAmount = commission ? amount * 0.012 : 0;

    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const transaction_id = transactions.length > 0 ? transactions[transactions.length - 1].transaction_id + 1 : 1;
    transactions.push({ transaction_id, card_number, atm_number, date_time, commission: commissionAmount, amount });
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));
    loadTransactions();
}

function deleteTransaction(index) {
    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    transactions.splice(index, 1);
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));
    loadTransactions();
}

function editTransaction(index) {
    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const transaction = transactions[index];
    document.getElementById('card_number').value = transaction.card_number;
    document.getElementById('atm_number').value = transaction.atm_number;
    document.getElementById('date_time').value = transaction.date_time;
    document.getElementById('commission').value = transaction.commission ? 'true' : 'false';
    document.getElementById('amount').value = transaction.amount;

    const form = document.getElementById('transactionForm');
    if (!form.querySelector('button[onclick="saveTransaction(' + index + ')"]')) {
        form.innerHTML += `<button type="button" onclick="saveTransaction(${index})">Сохранить</button>`;
    }
}

function saveTransaction(index) {
    const card_number = document.getElementById('card_number').value;
    const atm_number = document.getElementById('atm_number').value;
    const date_time = document.getElementById('date_time').value;
    const commission = document.getElementById('commission').value === 'true';
    const amount = document.getElementById('amount').value;
    const commissionAmount = commission ? amount * 0.012 : 0;

    const transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    transactions[index] = { transaction_id: transactions[index].transaction_id, card_number, atm_number, date_time, commission: commissionAmount, amount };
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));
    loadTransactions();

    const form = document.getElementById('transactionForm');
    form.innerHTML = `
        <label for="card_number">Номер карты:</label>
        <input type="text" id="card_number" required><br>
        <label for="atm_number">Номер банкомата:</label>
        <input type="number" id="atm_number" required><br>
        <label for="date_time">Дата и время:</label>
        <input type="datetime-local" id="date_time" required><br>
        <label for="commission">Комиссия:</label>
        <select id="commission" required>
            <option value="false">Нет</option>
            <option value="true">Да</option>
        </select><br>
        <label for="amount">Сумма:</label>
        <input type="number" id="amount" required><br>
        <button type="button" onclick="addTransaction()">Добавить операцию</button>
    `;
}

loadTransactions();