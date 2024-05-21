// drawController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fonction pour tirer des cartes
async function drawCards(req, res) {
    try {
        const userId = req.user.id;
        const lastDraw = req.user.lastdraw;
        const cards = await drawRandomCards();// Tirage des cartes
        const inventaire = await updateInventaire(userId, cards); // Mise à jour de l'inventaire de l'utilisateur
        res.status(200).json({ message: "Cartes tirées avec succès", inventory: inventaire, lastDraw: lastDraw });
    } catch (error) {
        console.error("Erreur lors du tirage de cartes :", error);
        res.status(500).json({ error: "Une erreur est survenue lors du tirage de cartes" });
    }
}

// Fonction pour vérifier si l'utilisateur a déjà tiré des cartes aujourd'hui
async function lastDraw(req, res, next) {
    try {
        const userId = req.user.id; 

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.lastdraw && new Date(user.lastdraw) > new Date(new Date() - 24 * 60 * 60 * 1000)) {
            return res.status(400).json({ error: "Vous avez déjà tiré des cartes aujourd'hui" });
        }

        next();
    } catch (error) {
        console.error("Erreur lors de la vérification du dernier tirage :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la vérification du dernier tirage" });
    }
}

// Fonction pour tirer des cartes aléatoires
async function drawRandomCards() {
    const tabR = [5, 6, 9, 10, 18, 19, 24, 26, 33];
    const tabSR = [2, 3, 4, 7, 11, 12, 13, 14, 16, 17, 20, 21, 23, 25, 27, 28, 31, 34, 35];
    const tabSSR = [1, 8, 15, 22, 29, 30, 32];
    const tabUR = [36, 37, 38, 39, 40];

    const cards = await prisma.card.findMany();
    const drawnCards = [];
    const rarityProbabilities = {
        R: 0.50,
        SR: 0.30,
        SSR: 0.15,
        UR: 0.04,
        LR: 0.01
    };

    while (drawnCards.length < 5) {
        // Générer un nombre aléatoire entre 0 et 1 pour choisir la rareté
        const rarityRoll = Math.random();

        // Sélectionner la rareté en fonction de la probabilité
        let rarity;
        if (rarityRoll < rarityProbabilities.LR) {
            rarity = 'LR';
        } else if (rarityRoll < rarityProbabilities.UR) {
            rarity = 'UR';
        } else if (rarityRoll < rarityProbabilities.SSR) {
            rarity = 'SSR';
        } else if (rarityRoll < rarityProbabilities.SR) {
            rarity = 'SR';
        } else {
            rarity = 'R';
        }

        // Sélectionner une carte aléatoire de la rareté choisie
        const cardrarity = cards.filter(card => {
            switch (rarity) {
                case 'R':
                    return tabR.includes(card.id);
                case 'SR':
                    return tabSR.includes(card.id);
                case 'SSR':
                    return tabSSR.includes(card.id);
                case 'UR':
                    return tabUR.includes(card.id);
                case 'LR':
                    return card.id === 41; // ou la dernière carte du tableau cards
                default:
                    return false;
            }
        });

        if (cardrarity.length > 0) {
            const randomIndex = Math.floor(Math.random() * cardrarity.length);
            drawnCards.push(cardrarity[randomIndex]);
        }
    }
    return drawnCards;
}

// Fonction pour mettre à jour l'inventaire de l'utilisateur
async function updateInventaire(userId, cards) {
    const inventaire = [];
    for (const card of cards) {
        const inventoryEntry = await prisma.inventaire.create({
            data: {
                ownerId: userId,
                cardId: card.id,
                quantity: 1
            }
        });
        inventaire.push(inventoryEntry.cardId);
    }

    // Mettre à jour la date du dernier tirage de l'utilisateur
    await prisma.user.update({
        where: { id: userId },
        data: { lastdraw: new Date() }
    });
    return inventaire;
}

export { drawCards, lastDraw };
