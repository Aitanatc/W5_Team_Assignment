const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const vhsController = require('../controllers/vhs');

router.get('/', requiresAuth(), vhsController.getAll);

router.get('/:id', requiresAuth(), vhsController.getSingle);

router.post('/', requiresAuth(), vhsController.createVHS);

router.put('/:id', requiresAuth(), vhsController.updateVHS);

router.delete('/:id', requiresAuth(), vhsController.deleteVHS);

module.exports = router;