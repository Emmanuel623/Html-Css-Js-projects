const { getUser } = require('../service/auth')
const cookieParser = require('cookie-parser');


async function OnlyAuthUser(req, res, next) {
    // console.log(req.cookies.uid)
    const useruid = req.cookies?.uid;
    if (!useruid) return res.sendFile('/signin');

    const user = getUser(useruid);
    if (!user) return res.sendFile('/signin');

    req.user = user;
    next();
}

module.exports = {
    OnlyAuthUser
}