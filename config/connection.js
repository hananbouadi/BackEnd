const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/restauration')
        .then(
            ()=>{
                console.log('connected')
            }
        )
        .catch(
            (error)=>{
                console.log(error,'connecting to database')
            }
        )