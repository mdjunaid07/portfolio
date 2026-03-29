const API_URL = 'http://localhost:5000/api';

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const messagesBody = document.getElementById('messagesBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// Check Authtentication Status
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'flex';
        fetchMessages(token);
    } else {
        loginSection.style.display = 'flex';
        dashboardSection.style.display = 'none';
    }
}

// Login Handler
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                checkAuth();
            } else {
                loginError.innerText = data.message || 'Login failed';
            }
        } catch (err) {
            loginError.innerText = 'Could not connect to server';
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        checkAuth();
    });
}

// Fetch Messages
async function fetchMessages(token) {
    try {
        const res = await fetch(`${API_URL}/admin/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) {
            localStorage.removeItem('adminToken');
            checkAuth();
            return;
        }

        const messages = await res.json();
        renderTable(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
    }
}

// Render Table
function renderTable(messages) {
    messagesBody.innerHTML = '';
    
    if (messages.length === 0) {
        messagesBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No messages found.</td></tr>`;
        return;
    }

    messages.forEach(msg => {
        const tr = document.createElement('tr');
        const date = new Date(msg.createdAt).toLocaleDateString();
        
        tr.innerHTML = `
            <td>${date}</td>
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.phone || 'N/A'}</td>
            <td>${msg.message}</td>
            <td>
                <button class="del-btn" onclick="deleteMessage('${msg._id}')">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;
        messagesBody.appendChild(tr);
    });
}

// Delete Single Message
async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
        const res = await fetch(`${API_URL}/admin/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
            fetchMessages(token);
        } else {
            alert('Failed to delete message');
        }
    } catch (err) {
        console.error(err);
    }
}

// Delete All Messages
if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', async () => {
        if (!confirm('WARNING: Are you sure you want to delete ALL messages?')) return;
        
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/admin/messages`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                fetchMessages(token);
            } else {
                alert('Failed to delete messages');
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Init
checkAuth();
