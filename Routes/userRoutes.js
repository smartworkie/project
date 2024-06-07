const express = require('express');
const {registerUser, authenticateUser} = require ('../Controller/authController')


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser)

module.exports = router;

