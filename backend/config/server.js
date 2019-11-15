const cors = require('cors');

const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(cors());

consign()
    .include('./server/routes')
    .then('./config/dbConnection.js')
    .then('./server/models')
    .then('./server/controllers')
    .into(app)

module.exports = app;
