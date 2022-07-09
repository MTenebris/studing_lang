const Palabra = require('../models/palabta')
const Prueba = require('../models/prueba')



function find_tareas (tema1, ejercio1, js, result){
    let tareas =[];
    let resultado=0;
    let coor=0;
    console.log("vez", result[0].vez)
    if ( js["reponder"].length) {
       for (let i=0; i<js["reponder"].length; i++) {
            if(result[0].tareas[i].correcto == js["reponder"][i]){
                coor+=1;
            }
            let tarea = { respondo:js["reponder"][i], correcto: result[0].tareas[i].correcto, pregunta: result[0].tareas[i].pregunta, id:i }; 
            tareas.push(tarea);
           
        }
    }
    console.log(tareas)
    resultado=(coor * 100)/js["reponder"].length;
    Prueba.findOneAndUpdate({tema:tema1, ejercio:ejercio1}, {resultado : resultado, tareas:tareas}).then ((result)=>console.log("Update"))
    console.log(result[0].ejercio)
}



module.exports = function resultado(js, tema1,  ejercio1) {
    Prueba
    .find({tema:tema1, ejercio:ejercio1})
    .then((result) => find_tareas(tema1, ejercio1, js,result))   
}