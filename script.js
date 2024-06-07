document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const dailyDataForm = document.getElementById('daily-data-form');
    const reportsList = document.getElementById('reports-list');
    const logoutButton = document.getElementById('logout-button');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (dailyDataForm) {
        dailyDataForm.addEventListener('submit', handleSubmitData);
        loadReports();
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    function handleSignup(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        localStorage.setItem(email, JSON.stringify({ password, reports: [] }));
        alert('Signup successful! Please log in.');
    }

    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            sessionStorage.setItem('loggedInUser', email);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid login credentials');
        }
    }

    function handleSubmitData(event) {
        event.preventDefault();
        const salah = document.getElementById('salah').value;
        const literature = document.getElementById('literature').value;
        const quran = document.getElementById('quran').value;
        
        const goodWork = document.querySelector('input[name="goodWork"]:checked').value;

        const email = sessionStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(email));
        const report = { date: new Date().toLocaleDateString(), salah, quran, literature, goodWork };
        user.reports.push(report);
        localStorage.setItem(email, JSON.stringify(user));
        loadReports();
    }

    function loadReports() {
        const email = sessionStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(email));
        reportsList.innerHTML = '';
        user.reports.forEach(report => {
            const li = document.createElement('li');
            li.textContent = `Date: ${report.date}, Salah: ${report.salah}, Quran: ${report.quran}, literature: ${report.literature} Good Work: ${report.goodWork}`;
            reportsList.appendChild(li);
        });
    }

    function handleLogout() {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    }
});
