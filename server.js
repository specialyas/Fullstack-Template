const express = require('express')

// const AnimeWord = require('./models/words.js');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()



const app = express()

const port = process.env.PORT || 4000


// connect to the database
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERSAME}:${process.env.MONGODB_PASSWORD}@cluster0.9bsedut.mongodb.net/${process.env.MONGOD_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))



// Middleware


//enable  CORS
app.use(cors())


//serve up static files 
app.use(express.static("public"));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Parse requests
app.use(express.urlencoded({extended: false}));
app.use(express.json())



// LOGIC GOES HERE


// homepage
app.get('/', (req, res) => {
    res.render('index')
})

// show all words
// app.get('/words', (req, res) => {

// ModelName
//   .find() 
//   .then(results => { 
//     // console.log(results)
//      res.render('words',  {words:results})
//     }).catch(error => {
//       res.send(error)
//       console.error(error)})   
// })

// add words 
// app.get('/add', (req, res) => {
//     res.render('add')
// })

 
// add a word
app.post('/word', (req, res) => {
    const word = new AnimeWord ({
        animeWord: req.body.animeWord, 
        meaning: req.body.meaning
        });
        word.save()
        .then(() => {
            console.log('Item succedfully added to the database');
            res.redirect('/words')
            })
        .catch((err) => {
            console.log(err);
        });  
    })


    // show the dashboard
// app.get('/dashboard', (req, res) => {
// res.render('dashboard')
// })

// delete a wpord
app.get('/delete', (req, res) => { 
    res.render('delete')
})
app.post('/delete', (req, res) => { 
  console.log(req.body)
  let word = req.body.animeWord
  AnimeWord.deleteOne(
        {animeWord: word}, 
      ) .then(() => {
        console.log("Successfully deleted word")
         res.redirect("/words")
       }).catch(error => {
         res.send(error)
         console.error(error)}) 
    })
    



// app.delete((req, res) => { 
//   Article.deleteOne(
//     {title: req.params.articleName},
//   ) .then(() => {
//      res.send("Successfully deleted article")
//    }).catch(error => {
//      res.send(error)
//      console.error(error)}) 
// })

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})


