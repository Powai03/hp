// Initialisation de la page d'inventaire
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3000/user/inventory/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        document.querySelector(".info").innerHTML += `
            <p>Nombre de cartes possédées : ${data.length}/41</p>
        `;
        // Récupération de la carte favorite de l'utilisateur
        if (response.ok) {
            const fetchHP = async () => {
                const response = await fetch('http://localhost:3000/api');
                return await response.json();
            };
            const cardSelect = document.querySelector('#cartepref');
            const datacard = await fetchHP();
            // Afficher les cartes dans la liste déroulante
            datacard.forEach((card) => {
                const option = document.createElement('option');
                option.value = card.pers;
                option.textContent = card.pers;
                cardSelect.appendChild(option);
            });
            const favoriteCard = data.favoriteCard;
            cardSelect.value = favoriteCard;
            // Afficher les cartes possédées
            for (let i = 0; i < data.length; i++) {
                document.querySelector(".card").innerHTML += `
                    <div class="flip-card" onclick="led(this)"> 
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img class="imgcard" src="${datacard[data[i] - 1].image}" width="189px" height="264px">
                            </div>
                            <div class="flip-card-back house${i}">
                                <h3 class="name"> ${datacard[data[i] - 1].pers}</h3>
                                <h4 class="resume"> ${datacard[data[i] - 1].resume} </h4>
                                <h4 class="resume"> ${datacard[data[i] - 1].rareté} </h4>
                                <h4 class="resume"> ${datacard[data[i] - 1].cardnbr}/41 </h4>
                                <h4 class="maison"> ${datacard[data[i] - 1].house} </h4>
                            </div>
                        </div>
                    </div>
                `;
                // Changer la classe en fonction de la maison
                const cardElementBack = document.querySelector(`.flip-card-back.house${i}`);
                if (datacard[data[i] - 1].house === 'Gryffindor') {
                    cardElementBack.classList.add('gryf');
                } else if (datacard[data[i] - 1].house === 'Slytherin') {
                    cardElementBack.classList.add('serp');
                } else if (datacard[data[i] - 1].house === 'Hufflepuff') {
                    cardElementBack.classList.add('pouf');
                } else if (datacard[data[i] - 1].house === 'Ravenclaw') {
                    cardElementBack.classList.add('serd');
                } else {
                    cardElementBack.classList.add('other');
                }
            }
        } else {
            alert("Erreur lors de la récupération de l'inventaire");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'inventaire:", error);
        alert("Une erreur est survenue lors de la récupération de l'inventaire.");
    }
});

// Fonction pour allumer la LED de la maison de la carte sur la raspberry
function led(carteled) {
    const maison = carteled.querySelector('.maison').textContent;
    console.log(maison);
    fetch("http://localhost:3000/iot/postIot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Iot: maison }),
    });
}

// Fonction pour mettre à jour la carte favorite de l'utilisateur
async function submitFavoriteCard(cardId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const response = await fetch(`http://localhost:3000/user/favorite/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ favorite: cardId })
    });
    if (response.ok) {
        alert('Carte favorite mise à jour avec succès !');
    } else {
        alert('Une erreur est survenue lors de la mise à jour de la carte favorite.');
    }
}

// Écouter le clic sur le bouton pour mettre à jour la carte favorite
document.getElementById('favoriteButton').addEventListener('click', function () {
    const selectedCardId = document.getElementById('cartepref').value;
    console.log("Selected card id:", selectedCardId);

    if (selectedCardId) {
        submitFavoriteCard(selectedCardId);
    } else {
        alert("Veuillez sélectionner une carte avant de mettre à jour la carte favorite.");
    }
});


