const dotenv = require('dotenv');

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/task', require('./task'));

// router.use('/task', (req, res) => {
//     res.redirect(
//         `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
//     );
// });

router.use('/auth', (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
});

router.use('/auth-callback', (req, res) => {
    res.redirect(
        "https://tastsmanager.onrender.com/api-docs/",
        // "http://localhost:3000/api-docs",

    );
     
  })

module.exports = router;