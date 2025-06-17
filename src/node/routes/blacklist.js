const router = require('express').Router();
const blacklistController   = require('../controllers/blacklistController');

router.post('/', blacklistController.add);
router.delete('/:id', blacklistController.remove);
module.exports = router;
