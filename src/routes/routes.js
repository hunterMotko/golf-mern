const { Router } = require('express');
const router = Router()
const { createUser, getUsers } = require('../controllers/user');
const { getCards, createCard, getOneCard} = require('../controllers/scorecard')

router.get('/user', getUsers)
router.post('/user', createUser);

router.get('/card', getCards);
router.get('/card/:id', getOneCard);
router.post('/card', createCard);

module.exports = { router }
