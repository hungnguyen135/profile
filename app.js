const express = require('express') //nằm trong node_modules
const app = express()
const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const apiRouter = require('./apiRouter')

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/express');

const bodyParser = require('body-parser')
const path = require("path");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/', apiRouter)