function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function showLoading(form) {
    const button = form.querySelector('.btn');
    const spinner = form.querySelector('.spinner');
    button.disabled = true;
    spinner.style.display = 'block';
}

function hideLoading(form) {
    const button = form.querySelector('.btn');
    const spinner = form.querySelector('.spinner');
    button.disabled = false;
    spinner.style.display = 'none';
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

async function handleLogin(event) {
    event.preventDefault();
    clearErrors();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!validateEmail(email)) {
        showError('loginEmailError', 'Veuillez entrer une adresse email valide');
        return false;
    }

    if (!validatePassword(password)) {
        showError('loginPasswordError', 'Le mot de passe doit contenir au moins 8 caractères');
        return false;
    }

    showLoading(event.target);
    
    try {
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Ici, ajoutez votre logique de connexion
        console.log('Tentative de connexion:', { email, password });
        
        // Redirection après connexion réussie
        // window.location.href = 'dashboard.html';
    } catch (error) {
        showError('loginPasswordError', 'Erreur de connexion. Veuillez réessayer.');
    } finally {
        hideLoading(event.target);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (name.length < 2) {
        showError('registerNameError', 'Le nom doit contenir au moins 2 caractères');
        return false;
    }

    if (!validateEmail(email)) {
        showError('registerEmailError', 'Veuillez entrer une adresse email valide');
        return false;
    }

    if (!validatePassword(password)) {
        showError('registerPasswordError', 'Le mot de passe doit contenir au moins 8 caractères');
        return false;
    }

    showLoading(event.target);
    
    try {
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Ici, ajoutez votre logique d'inscription
        console.log('Tentative d\'inscription:', { name, email, password });
        
        // Redirection ou affichage de message de succès
        toggleForms();
    } catch (error) {
        showError('registerEmailError', 'Erreur d\'inscription. Veuillez réessayer.');
    } finally {
        hideLoading(event.target);
    }
}