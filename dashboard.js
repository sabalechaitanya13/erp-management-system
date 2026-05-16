// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', async () => {
    await loadDashboardData();
    setUserName();
});

async function loadDashboardData() {
    showLoading(true);
    try {
        const metrics = await api.getDashboardMetrics();
        displayMetrics(metrics);
        
        const charts = await api.getDashboardCharts();
        displayCharts(charts);
    } catch (error) {
        showToast('Failed to load dashboard data', 'error');
        console.error(error);
    } finally {
        showLoading(false);
    }
}

function displayMetrics(data) {
    if (data.totalEmployees) document.getElementById('totalEmployees').textContent = data.totalEmployees;
    if (data.presentToday) document.getElementById('presentToday').textContent = data.presentToday;
}

function displayCharts(data) {
    // Chart rendering would go here with a charting library
    console.log('Charts data:', data);
}

function setUserName() {
    const userName = localStorage.getItem('userName') || 'Admin';
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = userName;
}
