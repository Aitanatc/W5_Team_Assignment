const express = require('express');
const router = express.Router();

const vhsController = require('../controllers/vhs');

router.get('/', vhsController.getAll);

router.get('/:id', vhsController.getSingle);

router.get('/:id', vhsController.getSingleNAME);

router.post('/', vhsController.createVHS);

router.put('/:id', vhsController.updateVHS);

router.delete('/:id', vhsController.deleteVHSNAME);

router.delete('/:id', vhsController.deleteVHS);

module.exports = router;