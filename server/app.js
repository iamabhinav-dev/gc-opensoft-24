const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const connectDB = require('./dataConnect.js');

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Connect to auth MongoDB

const { connectToMongoDB } = require('./connect');
connectToMongoDB(process.env.MONGO_URI).then(() => {
    console.log("Successfully connected to MongoDB - auth");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})


// Connect to data MongoDB

const uri = process.env.DATA_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

const isConnected = connectDB(client).catch(console.error);

const ensureDbConnection = async (req, res, next) => {
    try {
        if (!isConnected) {
            console.log("Reconnecting to MongoDB");
            await connectDB();
        }
        req.body.dbClient = client;
        next();
    } catch (error) {
        next(error);
    }
};

const port = process.env.PORT || 8000;

const userRoute = require('./routes/user');
const refreshRoute = require('./routes/refresh');
const logoutRoute = require('./routes/logout');
const genreRoute = require('./routes/genre');
const langRoute = require('./routes/lang');
const detailRoute = require('./routes/detail');
const searchRoute = require('./routes/search');
const favouritesRoute = require('./routes/favourites');

app.use('/user', userRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);
app.use('/genre', ensureDbConnection, genreRoute);
app.use('/lang', ensureDbConnection, langRoute);
app.use('/detail', ensureDbConnection, detailRoute);
app.use('/search', ensureDbConnection, searchRoute);
app.use('/favourites', favouritesRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})