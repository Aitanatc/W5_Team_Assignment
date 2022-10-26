const express = require('express');
const router = express.Router();

// const { requiresAuth } = require('express-openid-connect');

const taskController = require('../controllers/task');
//task controller is defined up here ^^
router.get('/', taskController.getAll);
// router.get('/', requiresAuth(), taskController.getAll);

router.get('/:id', taskController.getSingle);

router.post('/', taskController.createTASK);

router.put('/:id', taskController.updateTASK);

router.delete('/:id', taskController.deleteTASK);

module.exports = router;