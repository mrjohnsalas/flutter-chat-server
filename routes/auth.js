// path: api/login/new

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldValidations } = require('../middlewares/field-validations');

const { check } = require('express-validator');

const router = Router();

router.post('/new', [
    // middlewares
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    fieldValidations
], createUser);

router.post('/', [
    // middlewares
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    fieldValidations
], login);

router.get('/renew', renewToken);

module.exports = router;