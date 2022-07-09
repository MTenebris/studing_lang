const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pruebaSchema =  new Schema({ 
    tareas: [ {
        id:{
            type:Number
        },
        respondo:{
            type:String
        },
        correcto:{
            type:String
        },
        pregunta:{
            type:String
        }}

    ], 
    ejercio:{
        type:String
    },
    resultado:{
        type:Number

    },
    tema:{
        type:String
    }
})

const Prueba = mongoose.model('Prueba',pruebaSchema);

module.exports = Prueba;