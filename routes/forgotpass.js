const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const forgotpass = require("../middleware/forgotpass");

router.post("/", [body("email").isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ msg: "No User with this email address" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.jwtSecret,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", forgotpass, async (req, res) => {
    const { password } = req.body;

    let newPassword = {};

    newPassword.password = password;

    try {
        let user = await User.findById(req.params.id);

        const salt = await bcrypt.genSalt(10);

        newPassword.password = await bcrypt.hash(password, salt);

        user = await User.findByIdAndUpdate(req.params.id, {
            $set: newPassword,
        });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;
