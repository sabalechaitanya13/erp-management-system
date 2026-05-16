// API Handler for ERP System
class APIHandler {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
        this.token = localStorage.getItem('authToken');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Get authentication token
    getToken() {
        return this.token;
    }

    // Clear authentication
    clearAuth() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // Generic request handler
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (response.status === 401) {
                this.clearAuth();
                window.location.href = '/login.html';
                return null;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    // PUT request
    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    // DELETE request
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // AUTHENTICATION ENDPOINTS
    login(email, password) {
        return this.post('/auth/login', { email, password });
    }

    register(userData) {
        return this.post('/auth/register', userData);
    }

    forgotPassword(email) {
        return this.post('/auth/forgot-password', { email });
    }

    resetPassword(token, newPassword) {
        return this.post('/auth/reset-password', { token, newPassword });
    }

    // EMPLOYEE ENDPOINTS
    getEmployees(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/employees${params ? '?' + params : ''}`);
    }

    getEmployee(id) {
        return this.get(`/employees/${id}`);
    }

    createEmployee(data) {
        return this.post('/employees', data);
    }

    updateEmployee(id, data) {
        return this.put(`/employees/${id}`, data);
    }

    deleteEmployee(id) {
        return this.delete(`/employees/${id}`);
    }

    // ATTENDANCE ENDPOINTS
    getAttendance(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/attendance${params ? '?' + params : ''}`);
    }

    createAttendance(data) {
        return this.post('/attendance', data);
    }

    updateAttendance(id, data) {
        return this.put(`/attendance/${id}`, data);
    }

    // PAYROLL ENDPOINTS
    getPayroll(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/payroll${params ? '?' + params : ''}`);
    }

    createPayroll(data) {
        return this.post('/payroll', data);
    }

    approvePayroll(id) {
        return this.put(`/payroll/${id}/approve`, {});
    }

    generateSalarySlip(employeeId, month) {
        return this.get(`/salary-slip/${employeeId}/${month}`);
    }

    // INVENTORY ENDPOINTS
    getInventory(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/inventory${params ? '?' + params : ''}`);
    }

    getInventoryItem(id) {
        return this.get(`/inventory/${id}`);
    }

    createInventory(data) {
        return this.post('/inventory', data);
    }

    updateInventory(id, data) {
        return this.put(`/inventory/${id}`, data);
    }

    // PURCHASE ENDPOINTS
    getPurchases(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/purchase${params ? '?' + params : ''}`);
    }

    getPurchase(id) {
        return this.get(`/purchase/${id}`);
    }

    createPurchase(data) {
        return this.post('/purchase', data);
    }

    updatePurchase(id, data) {
        return this.put(`/purchase/${id}`, data);
    }

    approvePurchase(id) {
        return this.put(`/purchase/${id}/approve`, {});
    }

    // EXPENSE ENDPOINTS
    getExpenses(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.get(`/expense${params ? '?' + params : ''}`);
    }

    createExpense(data) {
        return this.post('/expense', data);
    }

    updateExpense(id, data) {
        return this.put(`/expense/${id}`, data);
    }

    // DASHBOARD ENDPOINTS
    getDashboardMetrics() {
        return this.get('/dashboard/metrics');
    }

    getDashboardCharts() {
        return this.get('/dashboard/charts');
    }

    // REPORTS ENDPOINTS
    generateAttendanceReport(filters) {
        return this.post('/reports/attendance', filters);
    }

    generatePayrollReport(filters) {
        return this.post('/reports/payroll', filters);
    }

    generateInventoryReport(filters) {
        return this.post('/reports/inventory', filters);
    }

    // SETTINGS ENDPOINTS
    getCompanySettings() {
        return this.get('/settings/company');
    }

    updateCompanySettings(data) {
        return this.put('/settings/company', data);
    }
}

// Create global API instance
const api = new APIHandler();

// Utility Functions
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type} animate-slide-right`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function showLoading(show = true) {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.className = 'global-loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }

    if (show) {
        loader.style.display = 'flex';
    } else {
        loader.style.display = 'none';
    }
}

function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
}

function formatCurrency(amount) {
    return '₹' + parseFloat(amount || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Check authentication on page load
function checkAuth() {
    if (!api.getToken()) {
        // If not on login or register page, redirect to login
        if (!window.location.pathname.includes('login.html') && 
            !window.location.pathname.includes('register.html') &&
            !window.location.pathname.includes('forgot-password.html')) {
            window.location.href = '/login.html';
        }
    }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);

// Log out function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        api.clearAuth();
        window.location.href = '/login.html';
    }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIHandler, api };
}
