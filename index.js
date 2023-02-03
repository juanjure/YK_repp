require('dotenv').config()
const express = require('express')
const path = require('path');
const router = express.Router();
const app = express()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))


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

app.listen(port)

