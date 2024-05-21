// Initialisation de la page d'échange de cartes
async function fetchUserCards() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3000/user/inventory/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user cards:', error);
        return [];
    }
}

// Fonction pour récupérer les autres utilisateurs
async function fetchOtherUsers() {
    try {
        // Effectuez une requête HTTP GET pour récupérer les autres utilisateurs depuis le backend
        const response = await fetch('http://localhost:3000/user/otherUsers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching other users:', error);
        return [];
    }
}

// Fonction pour envoyer une demande d'échange de cartes
async function exchangeCards() {
    const userId = localStorage.getItem('userId');
    const cardId = document.getElementById('userCards').value;
    const recipientId = document.getElementById('recipientUser').value;
    try {
        const response = await fetch('http://localhost:3000/user/exchange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, cardId, recipientId })
        });
        if (response.ok) {
            alert('Votre carte a été envoyée au joueur concerné.');
            location.reload();
        } else {
            alert('Une erreur est survenue lors de l\'envoi de la demande d\'échange.');
        }
    } catch (error) {
        console.error('Error exchanging cards:', error);
        alert('Une erreur est survenue lors de l\'envoi de la demande d\'échange.');
    }
}

// Fonction d'initialisation de la page
async function selectCreate() {
    const userCards = await fetchUserCards();
    const otherUsers = await fetchOtherUsers();
    console.log(otherUsers)
    const userCardsSelect = document.getElementById('userCards');
    // Ajouter les cartes de l'utilisateur connecté à la liste déroulante
    userCards.forEach(card => {
        const option = document.createElement('option');
        option.value = card;
        option.textContent = card;
        userCardsSelect.appendChild(option);
    });
    const recipientUserSelect = document.getElementById('recipientUser');
    // Ajouter les autres utilisateurs à la liste déroulante
    otherUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.pseudo;
        recipientUserSelect.appendChild(option);
    });
}
// Déclencher la création des listes déroulantes
selectCreate();
