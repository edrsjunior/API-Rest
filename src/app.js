const express = require('express'); /* IMPORTA O EXPRESS*/ 
const bodyParser = require('body-parser'); /* IMPORTA O BODY PARSER*/ 


const app = express(); //START express

var PORT = 3003;

app.use(bodyParser.json()); //API ENTEDER REQ json
app.use(bodyParser.urlencoded({extended: false})); //API ENTENDER PARAMETROS VIA URL

app.listen(process.env.PORT || PORT,function(err){  
    if (err) console.log(err);                                 //COLOCA O APP PARA ESCUTAR NA PORTA 3003 E
    console.log('Server running on port ',PORT);         //FAZ UM CALLBACK RETORNADO RODANDO EM....
});

app.get('/',(req,res)=>{
    res.send('OK');
});

app.get('/food',(req, res)=>{                      //DEFINE UMA RESPOSTA PARA GET
    res.json(['Arroz', 'feijão', 'bife']);              //req = request body | informações sobre o request
});                                                     //res = response body | informações