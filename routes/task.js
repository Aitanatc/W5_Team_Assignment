const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const vhsController = require('../controllers/task');

router.get('/', requiresAuth(), taskController.getAll);

router.get('/:id', requiresAuth(), taskController.getSingle);

router.post('/', requiresAuth(), taskController.createTASK);

router.put('/:id', requiresAuth(), taskController.updateTASK);

router.delete('/:id', requiresAuth(), taskController.deleteTASK);

module.exports = router;