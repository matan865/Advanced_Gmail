const express = require('express');
const router = express.Router();
const mailsController = require('../controllers/mailsController');

router.post('/', mailsController.sendMail);
router.get('/', mailsController.getInbox);

router.get('/:id', mailsController.getMail);
router.patch('/:id', mailsController.updateMail);
router.delete('/:id', mailsController.deleteMail);
router.get('/search/:query', mailsController.searchMails);
module.exports = router;