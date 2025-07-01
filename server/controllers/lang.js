
const HandleLang = async (req, res) => {
    const { lang,lim,dbClient } = req.body;

    const db = dbClient?.db("sample_mflix");
    const collection = db?.collection("movies");

    const pipeline = [
        {
            $match: {
                languages: { $in: [lang] }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                genres: 1,
                released: 1,
                poster: 1,
                imdb: 1,
                cast: 1,
                plot: 1,
            }
        },
        {
            $sort: {
                released: -1
            }
        },
        {
            $limit: lim ? lim : 20
        },
    ];
    const result = await collection?.aggregate(pipeline).toArray();
    res.json(result);
}

module.exports = HandleLang;