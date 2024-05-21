import express from 'express';
const router = express.Router();

// GET /api
router.get('/', (req, res) => {
    res.json([
        { pers: "Harry Potter", image: "https://pbs.twimg.com/media/GNJA6B-XkAAOZOa?format=png&name=360x360", cardnbr: 1, resume: "TUTU TUTUTU TUTU TU tu es un sorcier Harry.", rareté: "SSR", house: "Gryffindor" },
        { pers: "Hermione Granger", image: "https://pbs.twimg.com/media/GNJA96JX0AAti3g?format=png&name=360x360", cardnbr: 2, resume: "La crack ultime. D'après les rumeurs elle est aussi radiant sur Valorant.", rareté: "SR", house: "Gryffindor" },
        { pers: "Ron Weasley", image: "https://pbs.twimg.com/media/GNJBSC9XkAARpVj?format=png&name=360x360", cardnbr: 3, resume: "Eh mais t'es tout le temps là toi.", rareté: "SR", house: "Gryffindor" },
        { pers: "Ginny Weasley", image: "https://pbs.twimg.com/media/GNI9PTfW8AAb27A?format=png&name=360x360", cardnbr: 4, resume: "L'heureuse élue qui a chamboulé le coeur d'Harry.", rareté: "SR", house: "Gryffindor" },
        { pers: "Neuville Londubat", image: "https://pbs.twimg.com/media/GNJBLfhWYAAZl8R?format=png&name=360x360", cardnbr: 5, resume: "L'imbécile de service, le boosted sur LoL, le bambi sur Fortnite.", rareté: "R", house: "Gryffindor" },
        { pers: "Finnigan Seamus", image: "https://pbs.twimg.com/media/GNI9M2UXsAA8r5y?format=png&name=360x360", cardnbr: 6, resume: "Il fait plein de trucs mais c'est un random je crois bien.", rareté: "R", house: "Gryffindor" },
        { pers: "Lavande Brawn", image: "https://pbs.twimg.com/media/GNJBHLsWUAA9hmU?format=png&name=360x360", cardnbr: 7, resume: "L'ex de Ron, voilà c'est tout.", rareté: "SR", house: "Gryffindor" },
        { pers: "Drago Malfoy", image: "https://pbs.twimg.com/media/GNI9HRaWkAEu7xL?format=png&name=360x360", cardnbr: 8, resume: "Vilaine canaille prétentieuse, figure emblématique de Serpentard.", rareté: "SSR", house: "Slytherin" },
        { pers: "Gregory Goyle", image: "https://pbs.twimg.com/media/GNI9Q9sWUAAD9Ba?format=png&name=360x360", cardnbr: 9, resume: "Golem de pierre personnel de Drago.", rareté: "R", house: "Slytherin" },
        { pers: "Vincent Crabbe", image: "https://pbs.twimg.com/media/GNJBXcKXMAAxnnj?format=png&name=360x360", cardnbr: 10, resume: "Golem de terre personnel de Drago.", rareté: "R", house: "Slytherin" },
        { pers: "Theodore Nott", image: "https://pbs.twimg.com/media/GNJBUrFXkAA-Txd?format=png&name=360x360", cardnbr: 11, resume: "Le contrebandier de l'école.", rareté: "SR", house: "Slytherin" },
        { pers: "Blaise Zabini", image: "https://pbs.twimg.com/media/GNI81ZYW8AEAVSW?format=png&name=360x360", cardnbr: 12, resume: "Sacré BG bressom en mode Sasuke.", rareté: "SR", house: "Slytherin" },
        { pers: "Millicent Bulstrode", image: "https://pbs.twimg.com/media/GNJBLfrWQAA2xUX?format=png&name=360x360", cardnbr: 13, resume: "Palmarès: a déjà fait un pur 1v1 contre Hermione.", rareté: "SR", house: "Slytherin" },
        { pers: "Pansy Parkinson", image: "https://pbs.twimg.com/media/GNJBOz7XMAAfqS3?format=png&name=360x360", cardnbr: 14, resume: "Si tu cherches la plus pénible de la licence: la voilà.", rareté: "SR", house: "Slytherin" },
        { pers: "Hannah Abbot", image: "https://pbs.twimg.com/media/GNI9Ut9XQAEDgtl?format=png&name=360x360", cardnbr: 15, resume: "OG Poufsouffle ça force le respect.", rareté: "SSR", house: "Hufflepuff" },
        { pers: "Susan Bones", image: "https://pbs.twimg.com/media/GNJBUrNXYAAhmwk?format=png&name=360x360", cardnbr: 16, resume: "Voldemort a raffalé sa famille.", rareté: "SR", house: "Hufflepuff" },
        { pers: "Justin Finch-Fletchley", image: "https://pbs.twimg.com/media/GNJBBbHXsAA5AiK?format=png&name=360x360", cardnbr: 17, resume: "Pétrifié le bougito.", rareté: "SR", house: "Hufflepuff" },
        { pers: "Wayne Hopkins", image: "https://pbs.twimg.com/media/GNJBXcTXwAAlPZW?format=png&name=360x360", cardnbr: 18, resume: "Un random de chez Poufsouffle", rareté: "R", house: "Hufflepuff" },
        { pers: "Megan Jones", image: "https://pbs.twimg.com/media/GNJBLfhXoAANDtB?format=png&name=360x360", cardnbr: 19, resume: "Une random de chez Poufsouffle", rareté: "R", house: "Hufflepuff" },
        { pers: "Ernie Macmillan", image: "https://pbs.twimg.com/media/GNI9K1QXMAAoeJu?format=png&name=360x360", cardnbr: 20, resume: "Il a eu 0/20 avec le serpent.", rareté: "SR", house: "Hufflepuff" },
        { pers: "Cedric Diggory", image: "https://pbs.twimg.com/media/GNI88BEWIAEIhuI?format=png&name=360x360", cardnbr: 21, resume: "RIP, en plus il avait une copine...", rareté: "SR", house: "Hufflepuff" },
        { pers: "Cho Chang", image: "https://pbs.twimg.com/media/GNI896DXgAE4X2M?format=png&name=360x360", cardnbr: 22, resume: "L'ex de Harry, mais avant ça, veuve à 20 ans c'est chaud...", rareté: "SSR", house: "Ravenclaw" },
        { pers: "Terry Boot", image: "https://pbs.twimg.com/media/GNJBUrGW8AArYV6?format=png&name=360x360", cardnbr: 23, resume: "La poucave qui retourne sa veste, honteux...", rareté: "SR", house: "Ravenclaw" },
        { pers: "Mandy Brocklehurst", image: "https://pbs.twimg.com/media/GNJBHLvWIAA_nGq?format=png&name=360x360", cardnbr: 24, resume: "Le nom de famille...normal elle a pas de lore.", rareté: "R", house: "Ravenclaw" },
        { pers: "Padma Patil", image: "https://pbs.twimg.com/media/GNJBOz6WMAAIQCP?format=png&name=360x360", cardnbr: 25, resume: "La cavalière de Ron en 4e année.", rareté: "SR", house: "Ravenclaw" },
        { pers: "Lisa Turpin", image: "https://pbs.twimg.com/media/GNJBHLvXwAAOkV5?format=png&name=360x360", cardnbr: 26, resume: "Une random de chez Serdaigle", rareté: "R", house: "Ravenclaw" },
        { pers: "Davies Roger", image: "https://pbs.twimg.com/media/GNI9Cq0XMAAGT-J?format=png&name=360x360", cardnbr: 27, resume: "Une coupe t'as peur heureusement ça joue au Quidditch.", rareté: "SR", house: "Ravenclaw" },
        { pers: "Luna Lovegood", image: "https://pbs.twimg.com/media/GNJBHLuW8AEKPEV?format=png&name=360x360", cardnbr: 28, resume: "Un peu cheloue mais pas méchante.", rareté: "SR", house: "Ravenclaw" },
        { pers: "Albus Dumbledore", image: "https://pbs.twimg.com/media/GNI9I31XkAA1bdF?format=png&name=360x360", cardnbr: 29, resume: "Légende du club + crackito + poussiéreux + RIP + 1v9 report bot for feeding.", rareté: "SSR", house: "Professor" },
        { pers: "Severus Rogue", image: "https://pbs.twimg.com/media/GNJBSDHX0AAHlkN?format=png&name=360x360", cardnbr: 30, resume: "Méchant puis gentil, j'ai rien capté à l'histoire.", rareté: "SSR", house: "Professor" },
        { pers: "Remus Lupin", image: "https://pbs.twimg.com/media/GNJBSDFWMAAZ9BN?format=png&name=360x360", cardnbr: 31, resume: "Le prof de self-defense euh... de défense contre les forces du mal.", rareté: "SR", house: "Professor" },
        { pers: "Minerva McGonagall", image: "https://pbs.twimg.com/media/GNJBLfiXAAE5HHw?format=png&name=360x360", cardnbr: 32, resume: "Prof de métamorphose et directrice de Poudlard, légende du club.", rareté: "SSR", house: "Professor" },
        { pers: "Dolores Ombrage", image: "https://pbs.twimg.com/media/GNI9FqxWgAAzwWw?format=png&name=360x360", cardnbr: 33, resume: "La relou du ministère de la magie.", rareté: "R", house: "Professor" },
        { pers: "Horace Slughorn", image: "https://pbs.twimg.com/media/GNJA_6fWEAE3ceE?format=png&name=360x360", cardnbr: 34, resume: "Le prof de potions, askip il travaille chez fortnite maintenant.", rareté: "SR", house: "Professor" },
        { pers: "Rolanda Bibine", image: "https://pbs.twimg.com/media/GNJBSDEXsAAjBj3?format=png&name=360x360", cardnbr: 35, resume: "La prof avec les balais qui volent.", rareté: "SR", house: "Professor" },
        { pers: "Cape d'invisibilité", image: "https://pbs.twimg.com/media/GNI854OWMAA4tXz?format=png&name=360x360", cardnbr: 36, resume: "On la voit pas mais elle est vraiment là.", rareté: "UR", house: "Legendary" },
        { pers: "Pierre philosophale", image: "https://pbs.twimg.com/media/GNJBOz0XAAEkBwD?format=png&name=360x360", cardnbr: 37, resume: "C'est juste un caillou.", rareté: "UR", house: "Legendary" },
        { pers: "Voldemort", image: "https://pbs.twimg.com/media/GNJBXcQXIAAtl-u?format=png&name=360x360", cardnbr: 38, resume: "Pas de nez, pas de chocolat...", rareté: "UR", house: "Legendary" },
        { pers: "Hagrid Rubeus", image: "https://pbs.twimg.com/media/GNI9S2BXAAAZlYw?format=png&name=360x360", cardnbr: 39, resume: "Le mec là... mais siii celui qui habite dans la forêt!", rareté: "UR", house: "Legendary" },
        { pers: "Harry Potter Shiny", image: "https://pbs.twimg.com/media/GNJBUrMXgAAwRU2?format=png&name=360x360", cardnbr: 40, resume: "Harry après le vaccin.", rareté: "UR", house: "Legendary" },
        { pers: "Pikachu", image: "https://pbs.twimg.com/media/GNJBO0EWEAAgeok?format=png&name=360x360", cardnbr: 41, resume: "Il s'est perdu à Poudlard...", rareté: "LR", house: "Secret" }
    ]);
});

export default router;