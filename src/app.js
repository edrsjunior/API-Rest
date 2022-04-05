const express = require('express'); /* IMPORTA O EXPRESS*/ 
const bodyParser = require('body-parser'); /* IMPORTA O BODY PARSER*/ 
const session = require('express-session'); /*TIPO UMA SESSAO PHP*/ 

const PORT = 3003;

const app = express(); //START express
app.use(express.json()); //USAR JSON

//SIMULAR UM BD
let userDB = [];



app.use(bodyParser.json()); //API ENTEDER REQ json
app.use(bodyParser.urlencoded({extended: false})); //API ENTENDER PARAMETROS VIA URL
app.use(session({secret:'asgfagag456as47g98a'})); //SEGREDO DA SENHA, PARAMETRO BASE

app.listen(process.env.PORT || PORT,function(err){  
    if (err) console.log(err);                                 //COLOCA O APP PARA ESCUTAR NA PORTA 3003 E
    console.log('Server running on port ',PORT);         //FAZ UM CALLBACK RETORNADO RODANDO EM....
});

app.get('/',(req,res)=>{
    res.send('OK');
});

app.post('/pessoas',(req,res)=>{
    const {id, nome, cpf,dataNasc} = req.body;
    const pessoa = {id,nome,cpf,dataNasc};
    userDB.push(pessoa);
    return res.status(201).json(userDB);

});

app.get('/pessoas/:pessoa_id',(req,res)=>{
    const {pessoa_id} = req.params;
    const onePessoaGet = userDB.find((pessoa)=>pessoa.id === pessoa_id);

    return res.status(200).json(onePessoaGet);
});

app.get('/pessoas',(req,res)=>{
    return res.status(200).json(userDB);
});

app.get('/food',(req, res)=>{                      //DEFINE UMA RESPOSTA PARA GET
    res.json(['Arroz', 'feijão', 'bife']);              //req = request body | informações sobre o request
});                                                     //res = response body | informações

app.post('/login',(req,res)=>{

});