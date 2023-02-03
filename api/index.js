const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.get('/api', (req, res)=>{
    res.send("Hola mundo")
})

app.listen(port)
