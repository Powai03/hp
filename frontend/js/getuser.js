let token = localStorage.getItem('token');
console.log(token);
let userId = localStorage.getItem('userId');
console.log(userId);

// Si il n'est pas connecté il est redirigé vers la page de connexion
if (!token) {
    window.location.href = 'login.html';
}

// Récupération des informations de l'utilisateur
fetch('http://localhost:3000/user/', {
    headers: {
        'x-access-token': `${token}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let user = document.querySelector('#infos');
        user.innerHTML += `
        <h1>${data.pseudo}</h1>
        <p>${data.email}</p>
        `;
        document.querySelector(".info");
        user.innerHTML += `
        <p>Dernier tirage : ${new Date(data.lastdraw).toLocaleString()}</p>
        <p>Carte préférée : ${data.favorite}</p>
        <p>Maison : ${data.maison}</p>
        `;
        document.querySelector(".profil").classList.add(data.maison);
    })
    .catch((error) => {
        console.log(error);
    });

// Changement de la carte préférée
async function updateFavoriteCard() {
    try {
        const userId = localStorage.getItem('userId');
        const favorite = document.getElementById('cartepref').value;
        const response = await fetch(`http://localhost:3000/user/${userId}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favorite })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Updated user:', data);
            location.reload();
        } else {
            console.error('Echec de la mise à jour de la carte favorite.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la carte favorite:', error);
    }
}
