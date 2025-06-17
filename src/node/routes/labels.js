const express = require('express');
const router = express.Router();
const labelsController = require('../controllers/labelsController');

router.get('/', labelsController.getAllLabels);
router.get('/:id', labelsController.getLabelById);
router.post('/', labelsController.createLabel);
router.patch('/:id', labelsController.updateLabel);
router.delete('/:id', labelsController.deleteLabel);

module.exports = router;
