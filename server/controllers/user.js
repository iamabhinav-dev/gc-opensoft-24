const User = require('../model/user');
const { setUser } = require('../service/auth');

async function HandleUserSignUp(req, res) {
    const { name, password, email } = req.body;
    const ifuserexists = await User.findOne({
        name,
    })
    if (ifuserexists) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    const ifemailexits = await User.findOne({
        email,
    })
    if (ifemailexits) {
        return res.status(409).json({ message: 'Email already exists' });
    }
    const refresh_token = '';
    await User.create({
        name,
        email,
        password,
        refresh_token
    })
    return res.json({ message: 'User created successfully' });
}

async function HandleUserSignIn(req, res) {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const {access_token, refresh_token} = setUser(user);
    const { password: pwd, ...rest } = user.toObject()
    user.refresh_token = refresh_token;
    await user.save();
    res.cookie('jwt',refresh_token, {httpOnly: true, maxAge: 24*60*60*1000});
    return res.json({ access_token: access_token,email: user.email, favourites: user.favourite, plan: user.plan, recentSearches: user.recentSearches});
}

module.exports = {
    HandleUserSignUp,
    HandleUserSignIn
}