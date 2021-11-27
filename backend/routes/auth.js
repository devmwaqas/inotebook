const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


router.get('/login', (req, res) => {
    obj = {
        name: "waqas"
    }
    res.json(obj);
});

router.post('/registration', [

    body('name', 'Name must be greater or five characters.').isLength({ min: 5 }),
    body('email', 'Invalid email.').isEmail(),
    body('password', 'Password must be greater or six characters.').isLength({ min: 6 }),

],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user_exist = await Users.findOne({ email: req.body.email });

        if (user_exist) {
            return res.json({ "msg": "error", "response": "Email is already exist." })
        }

        const salt = await bcrypt.genSalt(10);
        hashPass = await bcrypt.hash(req.body.password,salt);

        try {

            Users.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
            });

            const data = {
                user: {
                    id: Users.id
                }
            }

            var authtoken = jwt.sign(data, 'secret');
            // res.json({authtoken});
            res.json({ "msg": "success", "response": "Successfully signup and loggedin.", 'token': authtoken });

        } catch(error) {
            res.status(500).send();
        }

    });

    //login endpoint

    router.post('/login',[
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password is required.').notEmpty()
    ], async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            let email = req.body.email;
           
            let user = await Users.findOne({ email });
            if(!user) {
                res.status(400).json({ error: "Please try to login with correct credentials."});
            }

            const passwordStatus = await bcrypt.compare(req.body.password, user.password);
            if(!passwordStatus) {
                res.status(400).json({ error: "Please try to login with correct credentials."});
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, 'secret');
            res.json({ "msg": "success", 'token': authtoken });
            
        } catch (error) {
            res.status(500).send({ error: "Internal server error."});
        }
    });

    router.post('/getuser', fetchuser , async (req,res) => {
        try {
            const userId = req.user.id;
            const user = await Users.findById(userId).select("-password");
            res.status(200).json({ user: user });
        } catch (error) {
            res.status(500).send();  
        }
    });

    router.post('/logout', fetchuser, async (req, res)=> {

        try {
            
            const token = req.header('Auth-Token');
            const data = {
                user: req.user.id
            };

            jwt.sign(data, 'secret', { expiresIn: '1s' });
            res.status(200).send("Loggedout");

        } catch (error) {
            res.status(500).send({ error: "Internal error"});
        }

    })

module.exports = router