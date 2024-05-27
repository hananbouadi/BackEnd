const mongoose = require('mongoose')

const Categorie = mongoose.model('Categorie' ,{
    title: {
        type:String
    },
    image: {
        type:String
    }
})
module.exports = Categorie