const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const bookController = require('../controllers/books');

router.get('/', requiresAuth(), bookController.getAll);

router.get('/:id', requiresAuth(), bookController.getSingle);

router.post('/', requiresAuth(), bookController.createBOOK);

router.put('/:id', requiresAuth(), bookController.updateBOOK);

router.delete('/:id', requiresAuth(), bookController.deleteBOOK);

module.exports = router;