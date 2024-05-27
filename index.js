const express = require("express")

const recipeRoute = require('./routes/recipe')

const categorieRoute = require('./routes/categorie')

const cors = require('cors');

require('./config/connection')

const app = express()

app.use(express.json())

app.use(cors());

app.use('/recipe' ,recipeRoute)

app.use('/categorie' ,categorieRoute)

app.use('/getimage',express.static('./uploads'))


app.listen(5000,()=>{
    console.log("listening on port 5000 ......")
})