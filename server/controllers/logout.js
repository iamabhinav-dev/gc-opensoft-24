const User = require('../model/user');

const handleLogout = async (req, res) => {
    //on client, we will delete the access token and refresh token
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refresh_token = cookies.jwt;

    const foundUser = await User.findOne({refresh_token});
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }

    foundUser.refresh_token = '';
    await foundUser.save();

    res.clearCookie('jwt', {httpOnly: true});
    return res.sendStatus(204);
}

module.exports = { handleLogout };