const mongoose = require('mongoose')

const Recipe = mongoose.model('Recipe' ,{
    title: {
        type:String,require:true
    },
    description: {
        type:String,require:true
    },
    price: {
        type:Number,require:true
    },
    image: {
        type:String,require:true
    },
    categorie: {
        type:String,require:true
    }
})
module.exports = Recipe