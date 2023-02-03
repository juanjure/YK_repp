require('dotenv').config()
const express = require('express')
const path = require('path');
const router = express.Router();
const app = express()


app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(express.json({
    type: "*/*"
}))


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'web')})
})

app.get('/api',(req,res)=>{
    //Envia index.html a la solicitud
    //console.log("estas en api")
})

app.listen(port)

