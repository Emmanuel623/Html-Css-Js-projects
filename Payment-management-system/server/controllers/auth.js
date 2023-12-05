const { Login } = require('../models/models');
const { setUser } = require('../service/auth')


async function handleUserSignup(req, res) {
    const { Fullname, Username, Password } = req.body;
    console.log(Fullname, Username, Password)
    try {
        // Create a new user in the database
        const result = await Login.create({
            Fullname,
            Username,
            Password
        });
        // Redirect to the signin page upon successful signup
        res.status(200).redirect('/signin');
    } catch (error) {
        // Handle the error, you can log it for debugging purposes
        console.error(error);
        // Render the signup page again with an error message
        res.status(400).json({ error: "user exists", redirecting: "/signin" })
    }
}


async function handleUserSignin(req, res) {
    const { Username, Password } = req.body;
    const user = await Login.findOne({ Username, Password });
    if (!user) {
        return res.json({ error: "invalid username / password", redirecting: "/signup" });
    }
    const token = setUser(user);
    res.cookie("uid", token)
    return res.redirect('/show/public/payments.html');
}


module.exports = {
    handleUserSignup,
    handleUserSignin
}
