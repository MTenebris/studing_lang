const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config();
const Palabra = require('./models/palabta')
const Prueba = require('./models/prueba')
const anadir_palabra = require('./middleware/anadir_tema');
const create_prueba = require('./middleware/metodo1')
const resultado = require('./middleware/resultado');



const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);
// create and set up a server

const app=express();

app.set('view engine', 'ejs');
app.use(express.static('./styles'))
app.use(express.urlencoded({ extended: true } ))

app.listen(3000,  (error) => {
  error ? console.log(error) : console.log("server listen");
})

// set up  a mongoose 
const bd = process.env.mongo_url;
console.log(bd);
mongoose
       .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
       .then((res)=>console.log("Connection to DB"))
       .catch((error)=>console.log(error))


// 

app.get('/', (req, res)=>{
    Palabra
          .distinct("tema", { dept: "A" } )
          // .find()
          .then((tema_name)=>res.render(createPath('index'),{'title':"index", tema_name}))
          // .catch((error)=>console.log(erros))
    
})//

app.get('/tema/:id', (req, res)=>{
  Prueba
      .deleteMany({tema:req.params.id})
      .then((result)=>console.log("deleted"))
Palabra
      .find({"tema":req.params.id})
      .then((result)=>res.render(createPath('tema'),{'title':req.params.id, result}))
      // .catch((error)=>console.log(erros))

})
app.delete('/tema/:id', (req, res)=>{
  console.log(req.params.id)
  Palabra
    .findByIdAndDelete(req.params.id)
    .then((result)=>console.log("deleted"))
    .catch((error)=>console.log("error"))
})


app.delete('/:id', (req, res)=>{
  console.log(req.params.id)
  Palabra
    .deleteMany({tema:req.params.id})
    .then((result)=>console.log("deleted"))
    .catch((error)=>console.log("error"))
})


app.get('/anadir_tema', (req, res)=>{
  
  res.render(createPath('anadir_tema'),{'title':"anadir tema"})
})


app.post('/anadir_tema', (req, res)=>{
  console.log(req.body["tema"])
  anadir_palabra(req.body,req.body["tema"]);
  res.redirect('/');  
})
app.get('/edit/:id', (req, res)=>{
  Palabra
       .findById(req.params.id)
       .then((palabra)=>  res.render(createPath('edit_tema'),{'title':"editor palabra", palabra}))
})


app.post('/edit/:id', (req, res)=>{
    console.log(`lol`)
    const { tema, palabro, traducor } = req.body;
    console.log(tema, palabro, traducor)
    const { id } = req.params;
    Palabra
      .findByIdAndUpdate(req.params.id, { tema, palabro, traducor })
      .then((result) => res.redirect(`/tema/${tema}`))
      .catch((error) => handleError(res, error));
})


//res.redirect(`/tema/${tema}`))
app.get('/tema/:id/anadir_palabra', (req, res)=>{
    res.render(createPath('anadir_palabra'),{'title':"anadir palabra", "tema_name":req.params.id})
})

app.post('/tema/:id/anadir_palabra', (req, res)=>{
  anadir_palabra(req.body,req.params.id);
  res.redirect(`/tema/${req.params.id}`);  
})



app.get('/tema/:id/cards', (req, res)=>{
  const title = req.params.id;
  Palabra 
         .find({name:title})
         .then((result)=>  res.render(createPath('cards'),{'title': title, result}))
 
})

app.get('/tema/:id/metodo1', (req, res)=>{
  const title = req.params.id; 
  Palabra
      .find({name:title})
      .then((result)=> create_prueba(result, title, 'metodo1'))
      .then(Prueba
        .findOne({name:title, ejercio: 'metodo1'})
        .then((result)=>res.render(createPath('metodo1'),{'title': title, result})))
  
})//




app.post('/tema/:id/metodo1', (req, res)=>{
  const p =  new Promise((resolve, reject)=>{
    resultado(req.body,  req.params.id ,'metodo1');
    resolve(0);
  });
  p
  .then((result)=> {res.redirect(`/tema/${req.params.id}/metodo1/fin`)})
})
  


app.get('/tema/:id/metodo1/fin', (req, res)=>{
  Prueba
        .find({name:req.params.id, ejercio: 'metodo1'})
        .then((result) => res.render(createPath('method1_resultado'),{'title':req.params.id,result}))
})


app.get('/tema/:id/metodo2', (req, res)=>{
  const title = req.params.id; 
  Palabra
      .find({name:title})
      .then((result)=> create_prueba(result, title, 'metodo2'))
      .then(Prueba
        .findOne({name:title, ejercio: 'metodo2'})
        .then((result)=>res.render(createPath('metodo2'),{'title': title, result})))
})//


app.post('/tema/:id/metodo2', (req, res)=>{
  const p =  new Promise((resolve, reject)=>{
    resultado(req.body,  req.params.id ,'metodo2');
    resolve(0);
  });
  p
  .then((result)=> {res.redirect(`/tema/${req.params.id}/metodo2/fin`)})
})
  
app.get('/tema/:id/metodo2/fin', (req, res)=>{
  Prueba
        .find({name:req.params.id, ejercio: 'metodo2'})
        .then((result) =>  res.render(createPath('method2_resultado'),{'title':req.params.id,result}) )
        //
})







