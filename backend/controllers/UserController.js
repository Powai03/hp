import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

// Fonction pour récupérer les informations de l'utilisateur
const getUser = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(decoded);
        prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        })
            .then((user) => {
                res.json(user);
                console.log(user);
            })
            .catch((error) => {
                res.json(error);
            });
    });
}

// Fonction pour récupérer l'inventaire de l'utilisateur
async function getUserInventory(req, res) {
    try {
        const userId = parseInt(req.params.userid);
        const userInventory = await prisma.inventaire.findMany({
            where: { ownerId: userId },
            select: { cardId: true },
            orderBy: { cardId: 'asc' }
        });
        const cardIds = [];
        for (const inventoryEntry of userInventory) {
            if (!cardIds.includes(inventoryEntry.cardId)) {
                cardIds.push(inventoryEntry.cardId);
            }
        }
        res.json(cardIds);
    } catch (error) {
        console.error("Error retrieving user inventory:", error);
        res.status(500).json({ error: "An error occurred while retrieving user inventory" });
    }
}

// Fonction pour mettre à jour la carte favorite de l'utilisateur
async function updateFavoriteCard(req, res) {
    const userId = parseInt(req.params.userId);
    const { favorite } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { favorite: favorite }
        });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating favorite card:', error);
        res.status(500).json({ error: 'An error occurred while updating the favorite card' });
    }
}

// Fonction pour envoyer des cartes entre utilisateurs
async function exchangeCards(req, res) {
    const { userId, cardId, recipientId } = req.body;

    try {
        await prisma.inventaire.updateMany({
            where: { ownerId: parseInt(userId), cardId: parseInt(cardId) },
            data: { ownerId: parseInt(recipientId) }
        });

        res.status(200).json({ message: 'Carte échangée avec succès.' });
    } catch (error) {
        console.error('Error exchanging cards:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'échange de cartes.' });
    }
}

// Fonction pour récupérer les autres utilisateurs
async function getOtherUsers(req, res) {
    const userId = req.params.userId;

    try {
        // Récupérez la liste des autres utilisateurs depuis la base de données à l'aide de Prisma
        const otherUsers = await prisma.user.findMany({
            where: { NOT: { id: userId } } // Exclure l'utilisateur connecté
        });

        res.json(otherUsers);
    } catch (error) {
        console.error('Error fetching other users:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des autres utilisateurs.' });
    }
}

export { getOtherUsers };
export { exchangeCards };
export { updateFavoriteCard };
export { getUserInventory };
export { getUser };