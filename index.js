require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const path = require('path');
const router = express.Router();
const app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.get(
    '/',
    (request, response) => {
        response.send('pagina Principal')
    }
);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;