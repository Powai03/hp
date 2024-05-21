// Initier la fonction logIn() lorsqu'on clique sur le bouton de connexion
const logIn = async () => {
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;
    let response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    let data = await response.json();
    localStorage.setItem('token', data.token); // Stocker le token JWT
    localStorage.setItem('userId', data.userId);
    window.location.href = 'home.html';
}
