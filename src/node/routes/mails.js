const express = require('express');
const router = express.Router();
const auth = require('../controllers/authMiddleware');
const mailsController = require('../controllers/mailsController');



router.post('/', auth, mailsController.sendMail);
router.get('/', auth, mailsController.getInbox);
router.get('/search/:query', auth, mailsController.searchMails);
router.get('/search/:query/', auth, mailsController.searchMails);

router.get('/:id', auth, mailsController.getMail);
router.patch('/:id', auth, mailsController.updateMail);
router.delete('/:id', auth, mailsController.deleteMail);
module.exports = router;