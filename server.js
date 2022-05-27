const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT||3000;
const MONGO_URL="mongodb+srv://Merey:06012004@cluster0.am5px.mongodb.net/?retryWrites=true&w=majority"
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");
const path = require("path");
mongoose.connect( MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
    .then(()=>console.log("Connected to db"))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname,'views')))
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})
app.get('/about', (req, res) => {
  res.render('about.ejs',{title:'About Us'})
})


app.use('/articles', articleRouter)

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)

})