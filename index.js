require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const router = express.Router()
const { Pool } = require('pg')
const app = express()

const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.db_pg,
    ssl: {
      rejectUnauthorized: false
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.get(
    '/api',
    (request, response) => {
        response.send('pagina Principal')
    }
);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;