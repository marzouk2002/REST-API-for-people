require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err)=> console.error(err))
db.once('open', ()=>console.log('Connected to Database'))

app.use(express.json())

const peopleRouter = require('./routes/people')
app.use('/people', peopleRouter)

let PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}...`))