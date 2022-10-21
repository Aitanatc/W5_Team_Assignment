const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/task', require('./task'));

// router.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

module.exports = router;