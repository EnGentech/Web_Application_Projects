document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('admin-auth-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const confirmPassword = document.getElementById('admin-confirm-password').value;
        const passcode = document.getElementById('admin-passcode').value;
        const errorMessage = document.getElementById('admin-error-message');
    
        // Regex to check if the password is alphanumeric and contains at least one special character
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    
        if (username === "" || password === "" || confirmPassword === "" || passcode === "") {
            errorMessage.textContent = "All fields are required.";
            errorMessage.style.display = "block";
        } else if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.display = "block";
        } else if (!passwordPattern.test(password)) {
            errorMessage.textContent = "Password must be alphanumeric and contain at least one special character.";
            errorMessage.style.display = "block";
        } else if (passcode.length < 8) {
            errorMessage.textContent = "Passcode must be at least 8 characters long.";
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
            this.submit(); 
        }
    });
    
    document.getElementById('admin-cancel-btn').addEventListener('click', function() {
        document.getElementById('admin-auth-form').reset();
        document.getElementById('admin-error-message').style.display = "none";
    });
    
    document.getElementById('admin-close-btn').addEventListener('click', function() {
        document.getElementById('admin-auth-container').style.display = 'none';
    });
});
