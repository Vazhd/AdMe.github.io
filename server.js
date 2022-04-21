const express=require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const port = 3000;
const app = express();
const ejs=require("ejs");


app.set('view engine', 'ejs');
app.use(express.static("views"));

app.get('/', (req, res) => {
    res.render('index.ejs',{title:'Home Page'})
});
app.get('/login', (req, res) => {
    res.render('login.ejs',{title:'Log in'})
})
app.get('/regPage', (req, res) => {
    res.render('regPage.ejs',{title:'Sign in'})
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

