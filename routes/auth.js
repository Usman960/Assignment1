const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

// Validation
const checkSignupFields = require("../validation/signup");

router.post("/signUp", async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        // Ensures that all entries by the user are valid
        const { errors, isValid } = checkSignupFields(req.body);

        // If any of the entries made by the user are invalid, a status 400 is returned with the error
        if (!isValid) {
            return res.status(400).json(errors);
        }
        let user = await Users.findOne({ email })
        if (user) return res.json({ msg: "USER EXISTS" })

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "CREATED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            employer: user.employer,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
