const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const palabraSchema =  new Schema({ 
    tema:{
        type:String,
    },
    palabro:{
        type:String,
        required:true
    },
    traducor:{
        type:String,
        required:true
    }
})

const Palabra = mongoose.model('Palabra',palabraSchema);

module.exports = Palabra;
