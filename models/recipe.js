const mongoose = require('mongoose')

const Recipe = mongoose.model('Recipe' ,{
    title: {
        type:String
    },
    description: {
        type:String
    },
    price: {
        type:Number
    },
    image: {
        type:String
    },
    categorie: {
        type:String
    }
})
module.exports = Recipe