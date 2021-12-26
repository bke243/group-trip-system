import express from "express";

var cors = require('cors')

// create server
const app = express();
app.use(cors({
    origin: ['*'],
}));


module.exports = app;
