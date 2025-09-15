const router = require('express').Router();
const auth = require('../controllers/authMiddleware');
const blacklistController   = require('../controllers/blacklistController');

router.post('/', auth, blacklistController.add);
router.delete('/:id', auth, blacklistController.remove);
module.exports = router;
