const users = JSON.parse(localStorage.getItem('users')) || [];
let atmData = JSON.parse(localStorage.getItem('atmData')) || [
    { id: 1, bankName: 'Bank A', location: 'City X', status: 'Active' },
    { id: 2, bankName: 'Bank B', location: 'City Y', status: 'Inactive' },
    { id: 3, bankName: 'Bank C', location: 'City Z', status: 'Active' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.atm-info-container').style.display = 'block';
        document.getElementById('greeting').textContent = `Welcome, ${user.username}!`;
        loadATMData(user.role);
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    users.push({ username: newUsername, password: newPassword, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful. You can now login.');
    showLoginForm();
});

function showRegistrationForm() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

function showLoginForm() {
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

function loadATMData(role) {
    const tableBody = document.querySelector('#atmTable tbody');
    tableBody.innerHTML = '';

    atmData.forEach(atm => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${atm.id}</td>
            <td>${atm.bankName}</td>
            <td>${atm.location}</td>
            <td>${atm.status}</td>
            <td>${role === 'admin' ? `<button onclick="editATM(${atm.id})">Edit</button>` : ''}</td>
        `;
        tableBody.appendChild(row);
    });
}

function editATM(id) {
    const atm = atmData.find(a => a.id === id);
    if (atm) {
        document.getElementById('editId').value = atm.id;
        document.getElementById('editBankName').value = atm.bankName;
        document.getElementById('editLocation').value = atm.location;
        document.getElementById('editStatus').value = atm.status;
        document.getElementById('editFormContainer').style.display = 'block';
    }
}

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const bankName = document.getElementById('editBankName').value;
    const location = document.getElementById('editLocation').value;
    const status = document.getElementById('editStatus').value;

    const atmIndex = atmData.findIndex(a => a.id === id);
    if (atmIndex !== -1) {
        atmData[atmIndex] = { id, bankName, location, status };
        localStorage.setItem('atmData', JSON.stringify(atmData));
        loadATMData('admin');
        document.getElementById('editFormContainer').style.display = 'none';
    }
});

function logout() {
    document.querySelector('.atm-info-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}