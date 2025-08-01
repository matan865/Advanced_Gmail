const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.registerUser);
router.get('/', usersController.getAllUsers); // New route for getting all users
router.get('/:id', usersController.getUser);

module.exports = router;
