import express from 'express';
import { getUser, getUserInventory, updateFavoriteCard, exchangeCards, getOtherUsers } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', getUser);
router.get('/inventory/:userid', getUserInventory);
router.post('/:userId/favorite', updateFavoriteCard);
router.post('/exchange', exchangeCards);
router.get('/otherUsers', getOtherUsers);

export default router;







