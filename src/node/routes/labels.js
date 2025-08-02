const express = require('express');
const router = express.Router();
const labelsController = require('../controllers/labelsController');
const auth = require('../controllers/authMiddleware');

router.get('/', auth, labelsController.getAllLabels);
router.get('/:id', auth, labelsController.getLabelById);
router.post('/', auth, labelsController.createLabel);
router.patch('/:id', auth, labelsController.updateLabel);
router.delete('/:id', auth, labelsController.deleteLabel);

module.exports = router;
