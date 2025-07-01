const User = require('../model/user');

async function HandleFavourite(req, res) {
    const { name,password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    try{
        const arr = user.favourite;
        const response = [];
        arr.forEach((item) => {
            response.push(item.id);
        })

        res.send(response);
    } catch{
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function HandleAll(req, res) {
    const { name,password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    try{
        return res.json({ favourites : user.favourite });
    } catch{
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function HandleAddFavourite(req, res) {
    const { name,password,id,poster,title } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    try{
        user.favourite.push({id:id,title:title,poster:poster});
        await user.save();

        return res.json({ favourites : user.favourite, message: 'Favourite added' });
    } catch{
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function HandleRemoveFavourite(req, res) {
    const { name,password,id } = req.body;
    const user = await User.findOne({ name, password});
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    try{
        user.favourite = user.favourite.filter(fav => fav.id !== id);
        await user.save();

        return res.json({ favourites : user.favourite, message: 'Favourite removed' });
    } catch{
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    HandleAddFavourite,
    HandleRemoveFavourite,
    HandleFavourite,
    HandleAll
}