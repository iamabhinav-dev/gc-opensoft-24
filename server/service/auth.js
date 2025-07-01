const jwt = require('jsonwebtoken');
require('dotenv').config();
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

function setUser(user){
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    const access_token = jwt.sign(payload, access_token_secret, {expiresIn: "1h"});
    const refresh_token = jwt.sign(payload, refresh_token_secret, {expiresIn: "1d"});
    return {access_token, refresh_token};
}

function getUser(token){
    try{
        return jwt.verify(token, secret);
    } catch(err){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}