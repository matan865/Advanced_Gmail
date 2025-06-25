const express = require('express');
const router = express.Router();
const auth = require('../controllers/authMiddleware');
const mailsController = require('../controllers/mailsController');

router.post('/', auth, mailsController.sendMail);
router.get('/', auth, mailsController.getInbox);

router.get('/:id',       auth, mailsController.getMail);
router.patch('/:id',     auth, mailsController.updateMail);
router.delete('/:id',    auth, mailsController.deleteMail);
router.get('/search/:query', auth, mailsController.searchMails);

module.exports = router;