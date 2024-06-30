const atmData = JSON.parse(localStorage.getItem('atmData')) || [];

function loadATMData() {
    const tableBody = document.querySelector('#atmTable tbody');
    tableBody.innerHTML = '';

    atmData.forEach(atm => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${atm.id}</td>
            <td>${atm.bankName}</td>
            <td>${atm.location}</td>
            <td>${atm.status}</td>
            <td><button onclick="editATM(${atm.id})">Edit</button></td>
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
        loadATMData();
        document.getElementById('editFormContainer').style.display = 'none';
    }
});

function logout() {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', loadATMData);