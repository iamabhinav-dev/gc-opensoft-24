require('dotenv').config();

const hf_token = process.env.HF_TOKEN_SECRET
const embedding_url = process.env.HF_URL
const axios = require('axios');

async function generate_embedding(text) {
    try {
        const response = await axios.post(embedding_url, {
            inputs: text
        }, {
            headers: {
                'Authorization': `Bearer ${hf_token}`
            }
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error generating embedding:', error.response ? error.response.data : error.message);
        return null;
    }
}

const HandleAdvancedSearch = async (req, res) => {
    const { query, dbClient } = req.body;

    const db = dbClient?.db('sample_mflix');
    const collection = db?.collection('movies');

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const embedding = await generate_embedding(query);

        const results = await collection.aggregate([
            {
                "$vectorSearch": {
                    "queryVector": embedding,
                    "path": "plot_embedding_hf",
                    "numCandidates": 100,
                    "limit": 100,
                    "index": "vector_index"
                }
            },
            {
                '$project': {
                    "_id": 1,
                    "title": 1,
                    "poster": 1,
                }
            }
        ]).toArray();

        const response = results.map(doc => ({
            title: doc.title,
            poster: doc.poster,
            id: doc._id
        }));

        res.json(response);
    } catch (error) {
        console.error('Error performing search:');
        res.status(500).json({ error: error.message });
    }
}

const HandleAutoSearch = async (req, res) => {
    const { query, dbClient } = req.body;

    const db = dbClient?.db('sample_mflix');
    const collection = db?.collection('movies');

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const autopipeline = [
            {
                '$search': {
                    'index': 'default',
                    'autocomplete': {
                        'query': query,
                        'path': 'title',
                        'tokenOrder': 'sequential',
                    }
                },
            },
            {
                '$project': {
                    "_id": 1,
                    "title": 1,
                    "poster": 1,
                }
            },
            {
                '$limit': 10
            }
        ]
        const arr = await collection.aggregate(autopipeline).toArray();

        const response = arr.map(doc => ({
            title: doc.title,
            poster: doc.poster,
            id: doc._id
        }));

        res.send(response);
    }
    catch {
        console.error('Error performing search:');
        res.status(500).json({ error: error.message });
    }
}

const HandleBasicSearch = async (req, res) => {
    const { query, dbClient } = req.body;

    const db = dbClient?.db('sample_mflix');
    const collection = db?.collection('movies');

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const pipelinefuzzy = [
            {
                '$search': {
                    'index': 'fuzzy_search',
                    'text': {
                        'query': query,
                        'path': ['title'],
                        'fuzzy': {
                            'maxEdits': 2,
                            'prefixLength': 3,
                        }
                    }
                },
            },
            {
                '$project': {
                    "_id": 1,
                    "title": 1,
                    "poster": 1,
                }
            },
            {
                '$limit': 1000
            }
        ]
        const arr = await collection.aggregate(pipelinefuzzy).toArray();

        const response = arr.map(doc => ({
            title: doc.title,
            poster: doc.poster,
            id: doc._id
        }));

        res.send(response);
    }
    catch {
        console.error('Error performing search:');
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    HandleAdvancedSearch,
    HandleAutoSearch,
    HandleBasicSearch
}