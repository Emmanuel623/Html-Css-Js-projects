const JWT = require('jsonwebtoken')
const secret = "SecretEmmanuel623secret"

function setUser(user) {
    const expiresIn = 3600; // 1 hour in seconds
    const token = JWT.sign({
        _id: user._id,
        Username: user.Username,
        exp: Math.floor(Date.now() / 1000) + expiresIn, // Set the expiration time
    }, secret);
    return token;
}

function getUser(token) {
    if (!token) return null;
    try {
        return JWT.verify(token, secret);
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}