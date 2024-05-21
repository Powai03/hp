import jwt from 'jsonwebtoken';

// Fonction pour vérifier l'authentification
function authenticate(req, res, next) {
    // Vérifier le jeton JWT dans le header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); // Passez à l'étape suivante du middleware
    });
}

export { authenticate };
