const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// middleware
app.use(express.json())
app.use(cors())

// routers
const productRoute = require('./routes/product.route')


app.get('/', (req,res) =>{
 res.send('practice route is running successfully')
})

app.use('/api/v1/product', productRoute);

// mongoose eh data 3 vabeh get kora jay. (find kora jay

module.exports = app

