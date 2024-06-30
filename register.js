const users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    users.push({ username: newUsername, password: newPassword, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful. You can now login.');
    window.location.href = 'login.html';
});