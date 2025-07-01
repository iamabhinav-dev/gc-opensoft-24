const { ObjectId } = require("mongodb");

const HandleDetail = async (req, res) => {
    const { id, dbClient } = req.body;

    const db = dbClient?.db("sample_mflix");
    const collection = db?.collection("movies");

    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $project: {
                    title: 1,
                    genres: 1,
                    year: 1,
                    released: 1,
                    runtime: 1,
                    poster: 1,
                    imdb: 1,
                    fullplot: 1,
                    rated: 1,
                }
            }
        ];
        const result = await collection?.aggregate(pipeline).toArray();
        res.json(result);
    }
    catch (err) {
        console.log("Error in HandleDetail: ",err);
        res.json({error: "An error occurred"});
    }
}

module.exports = HandleDetail;