document.addEventListener("DOMContentLoaded", function() {
    const authContainer = document.getElementById("authContainer");
    const gameContainer = document.getElementById("gameContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    showRegister.addEventListener("click", function() {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLogin.addEventListener("click", function() {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    loginButton.addEventListener("click", async function() {
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        if ((password != "")&& (username != "")){
                await login(username, password);
            }
            else{
                document.getElementById("loginUsername").focus();
}});

    registerButton.addEventListener("click", async function() {
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;
            if ((password != "")&& (username != "")){
                    await register(username, password);
                }
                else{
                    document.getElementById("registerUsername").focus();
                }
    });

    async function login(username, password) {
        try {
            const response = await fetch('http://localhost/game/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.success) {
                authContainer.style.display = "none";
                gameContainer.style.display = "block";
                
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);
        }
    }

    async function register(username, password) {
        try {
            const response = await fetch('http://localhost/game/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.success) {
                alert('Registration successful, please log in.');
                registerForm.style.display = "none";
                loginForm.style.display = "block";
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed: ' + error.message);
        }
    }
});