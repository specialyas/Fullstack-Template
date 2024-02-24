const express = require('express')

// const AnimeWord = require('./models/words.js');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()



const app = express()

const port = process.env.PORT || 4000

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERSAME}:${process.env.MONGODB_PASSWORD}@cluster0.9bsedut.mongodb.net/${process.env.MONGOD_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))



// Middleware


//enable  CORS
app.use(cors())


//serve up static files 
