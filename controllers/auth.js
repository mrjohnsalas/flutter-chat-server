const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const emailFound = await User.findOne({ email });
        if (emailFound) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        }

        const user = new User(req.body);
        
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // save user
        await user.save();

        // generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // check if email exists
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({
                ok: false,
                msg: 'Email does not exist'
            });
        }

        // check if password is correct
        const validPassword = bcrypt.compareSync(password, userFound.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        // generate JWT
        const token = await generateJWT(userFound.id);

        res.json({
            ok: true,
            user: userFound,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error logging in'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid } = req;

    try {
        // generate JWT
        const token = await generateJWT(uid);

        // get user by uid
        const user = await User.findById(uid);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error renewing token'
        });
    }
}

module.exports = { createUser, login, renewToken };