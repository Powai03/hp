// recupérer les données de l'API
async function fetchHP() {
    const response = await fetch('http://localhost:3000/api');
    return response.json();
}

// afficher les cartes
async function displayHP(filter = '') {
    const data = await fetchHP();
    console.log(data);
    //evite de reprint des cartes a chaque fois
    document.querySelector(".card").innerHTML = '';

    data.forEach((card, index) => {
        // filtre
        if (!filter || card.house === filter) {
            document.querySelector(".card").innerHTML += `
                <div class="flip-card" onclick="led(this)"> 
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img class="imgcard" src="${card.image}" width="189px" height="264px">
                        </div>
                        <div class="flip-card-back house${index}">
                            <h3 class="name"> ${card.pers}</h3>
                            <h4 class="resume"> ${card.resume} </h4>
                            <h4 class="resume"> ${card.rareté} </h4>
                            <h4 class="maison"> ${card.house} </h4>
                        </div>
                    </div>
                </div>
            `;

            // Changer la classe en fonction de la maison
            const cardElementBack = document.querySelector(`.flip-card-back.house${index}`);
            switch (card.house) {
                case 'Gryffindor':
                    cardElementBack.classList.add('gryf');
                    break;
                case 'Slytherin':
                    cardElementBack.classList.add('serp');
                    break;
                case 'Hufflepuff':
                    cardElementBack.classList.add('pouf');
                    break;
                case 'Ravenclaw':
                    cardElementBack.classList.add('serd');
                    break;
                default:
                    cardElementBack.classList.add('other');
                    break;
            }
        }
    });
}

// Fonction pour filtrer les cartes par maison
function filterCardsByHouse(house) {
    displayHP(house);
}

// activer les filtres
document.getElementById('gryffindorFilter').addEventListener('click', () => filterCardsByHouse('Gryffindor'));
document.getElementById('slytherinFilter').addEventListener('click', () => filterCardsByHouse('Slytherin'));
document.getElementById('hufflepuffFilter').addEventListener('click', () => filterCardsByHouse('Hufflepuff'));
document.getElementById('ravenclawFilter').addEventListener('click', () => filterCardsByHouse('Ravenclaw'));

// reset les filtres
document.getElementById('resetFilterButton').addEventListener('click', () => displayHP());

displayHP();

// allumer led en fonction de la maison
function led(carteled) {
    maison = carteled.querySelector('.maison').textContent;
    console.log(maison);
    fetch("http://localhost:3000/iot/postIot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Iot: maison,
        }),
    });
}