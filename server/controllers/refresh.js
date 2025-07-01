const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/user');

const HandleRefresh = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;

    const foundUser = await User.findOne({refresh_token});
    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if(err || foundUser.name !== user.name) return res.sendStatus(403);
            
            const payload = {
                _id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
            const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            const name = foundUser.name;
            const password = foundUser.password;
            const email = foundUser.email;
            const plan = foundUser.plan;
            const favourites = foundUser.favourite;
            const recentSearches = foundUser.recentSearches;
            res.json({name, password, access_token, email, plan, favourites, recentSearches});
        }
    );
}

module.exports = {
    HandleRefresh
}