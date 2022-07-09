const Palabra = require('../models/palabta')
const Prueba = require('../models/prueba')

function find_vez(result) {
    // console.log(result)
    let vez=0;
    if(result.length){
        // console.log("lol")
        result.forEach(res => {
          
        if(res.vez > vez){
           vez=res.vez;
       }
    })
    }
    vez++;
    return vez;
}
function find_tareas (palabras, tema1, ejercio1){
    palabras.sort(() => Math.random() - 0.5)
    let tareas =[];
    if (palabras.length) {
       for (let i=0; i<palabras.length; i++) {
            let pr;
            if (ejercio1 == 'metodo1'){
                pr=palabras[i].traducor;
            }
            else if (ejercio1 == 'metodo2'){
                pr=palabras[i].palabro;
            }
            console.log(ejercio1,'- ', pr, ' - ')
            let tarea = { respondo:"resp", correcto: palabras[i].palabro, pregunta: pr, id:i}; 
            tareas.push(tarea);
           
        }
    }
    return tareas;
}

function push_prueba(vez1,tema1, ejercio1,tareas1){
    let prueba = Prueba({vez:vez1, resultado:0,tema:tema1, ejercio:ejercio1, tareas:tareas1});
    console.log(vez1)
    prueba.save();
}


module.exports = function create_prueba(palabras, tema1, ejercio1){
    // console.log(vez1)
    let tareas1 = find_tareas (palabras, tema1, ejercio1);
    Prueba
         .find({tema:tema1, ejercio:ejercio1})
         .then((result) => push_prueba( find_vez(result),tema1, ejercio1, tareas1))
    
}


