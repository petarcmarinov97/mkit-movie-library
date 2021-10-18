const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
