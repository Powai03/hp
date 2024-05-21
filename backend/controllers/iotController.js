import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

let Iot = " Gryffindor ";

// Get la maison dans le json
const getIot = async (req, res) => {
    return res.json({ Iot: Iot });
};

// Post la maison dans le json
const postIot = async (req, res) => {
    Iot = req.body.Iot;
    return res.json({ Iot: Iot });
}

export { getIot, postIot };