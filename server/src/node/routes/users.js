const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../controllers/authMiddleware');

router.get('/', auth, usersController.getAllUsers);
router.post('/', usersController.registerUser);
router.get('/:id', auth, usersController.getUser);

module.exports = router;
