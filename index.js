const express = require("express")

require('dotenv').config();

const recipeRoute = require('./routes/recipe')

const categorieRoute = require('./routes/categorie')

const cors = require('cors');
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoute");

require('dotenv/config')

require('./config/connection')

const app = express()

app.use(express.json())

app.use(cors());

app.use('/api/recipe' ,recipeRoute)

app.use('/categorie' ,categorieRoute)

app.use('/getimage',express.static('./uploads'))

app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)


app.listen(5000,()=>{
    console.log("listening on port 5000 ......")
})