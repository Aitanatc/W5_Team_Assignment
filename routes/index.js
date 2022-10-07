const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/vhs', require('./vhs'));
router.use('/books', require('./books'));

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;