const { Router } = require('express');
const router = Router()
const { createUser, getUsers, updateOne } = require('../controllers/user');
const {
  getCards, createCard, getOneCard, updateCard
} = require('../controllers/scorecard')

router.get('/user', getUsers);
router.post('/user', createUser);
router.post('/user/:id', updateOne);

router.get('/card', getCards);
router.get('/card/:id', getOneCard);
router.post('/card', createCard);
router.post('/card/:id', updateCard);

module.exports = { router }
