// Initier le tirage de cartes
async function drawCards() {
    try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le local storage
        const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur depuis le local storage
        const response = await fetch(`http://localhost:3000/draw/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes de la requête
            }
        });
        const data = await response.json();
        console.log(data.inventory);
        let draw = data.inventory;
        // Récupérer les cartes depuis l'API
        function fetchHP() {
            return fetch('http://localhost:3000/api')
                .then((response) => response.json())
        }
        const datacard = await fetchHP();
        // Afficher les cartes tirées
        for (let i = 0; i < 5; i++) {
            document.querySelector(".card").innerHTML += `
                <div class="flip-card" onclick="led(this)"> 
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img class="imgcard" src="${datacard[draw[i] - 1].image}"width: 189px;
                            height: 264px;>
                        </div>
                        <div class="flip-card-back house${i}">
                            <h3 class="name"> ${datacard[draw[i] - 1].pers}</h3>
                            <h4 class="resume"> ${datacard[draw[i] - 1].resume} </h4>
                            <h4 class="resume"> ${datacard[draw[i] - 1].rareté} </h4>
                            <h4 class="maison"> ${datacard[draw[i] - 1].house} </h4>
                        </div>
                    </div>
                </div>
                </a>
        `;
        // Changer la classe en fonction de la maison
            const cardElementBack = document.querySelector(`.flip-card-back.house${i}`); //trier les maisons pour avoir des cartes différentes
            if (datacard[draw[i] - 1].house == 'Gryffindor') {
                cardElementBack.classList.add('gryf');
            } else if (datacard[draw[i] - 1].house == 'Slytherin') {
                cardElementBack.classList.add('serp');
            } else if (datacard[draw[i] - 1].house == 'Hufflepuff') {
                cardElementBack.classList.add('pouf');
            } else if (datacard[draw[i] - 1].house == 'Ravenclaw') {
                cardElementBack.classList.add('serd');
            } else {
                cardElementBack.classList.add('other');
            }
        }
        // Afficher le nombre de cartes possédées
        if (response.ok) {
            const lastDraw = new Date(data.lastDraw); // Convertir la date du dernier tirage en objet Date
            const now = new Date(); // Date actuelle
            const diffInSeconds = Math.max(0, (lastDraw.getTime() + (24 * 60 * 60 * 1000) - now.getTime()) / 1000); // Calculer le temps restant en secondes
            // Si le temps restant est supérieur à zéro, démarrer le minuteur
            if (diffInSeconds > 0) {
                startTimer(diffInSeconds);
            } else {
                startTimer(24 * 60 * 60); // Si le temps restant est négatif, démarrer le minuteur pour 24 heures
            }
        } else {
            alert("Une erreur est survenue lors du tirage de cartes");
        }
    } catch (error) {
        console.log("Erreur lors du tirage de cartes ", error);
        alert("Vous avez déjà tiré des cartes aujourd'hui");
    }
}
// Démarrer le minuteur
function startTimer(timeLeft) {
    const timerElement = document.getElementById('timer');
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = true; // Désactive le bouton de tirage pendant le délai
    const timerInterval = setInterval(() => {
        const heures = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const secondes = timeLeft % 60;
        timerElement.innerText = `Prochain tirage dans : ${heures}h ${minutes}m ${secondes}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval); // Arrête le timer quand le délai est écoulé
            drawButton.disabled = false; // Active à nouveau le bouton de tirage
            timerElement.innerText = ""; // Efface le texte du timer
        } else {
            timeLeft--; //Enlève une seconde
        }
    }, 1000);
}
