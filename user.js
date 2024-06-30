function loadATMData() {
    const atmData = JSON.parse(localStorage.getItem('atmData')) || [];
    const tableBody = document.querySelector('#atmTable tbody');
    tableBody.innerHTML = '';

    atmData.forEach(atm => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${atm.id}</td>
            <td>${atm.bankName}</td>
            <td>${atm.location}</td>
            <td>${atm.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

function logout() {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', loadATMData);