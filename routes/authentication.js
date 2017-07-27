const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET authentication page. */
router.get('/login', (req, res) => {
    res.render('authentication/login');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.get('/signup', (req, res, next) => {
  res.render('authentication/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
