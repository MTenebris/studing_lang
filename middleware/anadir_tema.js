const Palabra = require('../models/palabta')


module.exports = function  anadir_palabra(js, tema){
    if(Array.isArray(js["palabro"])==true){
        for(let i=0; i< js["palabro"].length;i++){
            if(js["palabro"][i].length > 0 && js["traducor"][i].length > 0){
                // let tema = js["tema"];
                let palabro = js["palabro"][i];
                let traducor= js["traducor"][i];
                let pal = new Palabra({ tema , palabro,traducor});
                pal.save();
            }
        }

    }
    else{
        let palabro = js["palabro"];
        let traducor= js["traducor"];
        let pal = new Palabra({ tema , palabro,traducor});
        pal.save();

    }  
}

