const express = require('express');
//const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const bd = require('../data/queries.js');
const session = require('express-session');

const PORT = 3003;

const app = express(); //START express
app.use(express.json()); //USAR JSON

app.use(bodyParser.json()); //API ENTEDER REQ json
app.use(bodyParser.urlencoded({extended: false})); //API ENTENDER PARAMETROS VIA URL
app.use(session({secret:'asgfagag456as47g98a'})); //SEGREDO DA SENHA, PARAMETRO BASE

app.listen(process.env.PORT || PORT,function(err){  
    if (err) console.log(err);                                 //COLOCA O APP PARA ESCUTAR NA PORTA 3003 E
    console.log('Server running on port ',PORT);         //FAZ UM CALLBACK RETORNADO RODANDO EM....
});

app.get('/',(req,res)=>{
    if (req.session.login) {
        res.send("Althorized Access");
    }
    else{
        res.send("Unalthorized Access");
    }

});

app.get('/alunos',(req,res)=>{

    if (req.session.login) {
        bd.getUsers;

            
    }
    else{
        res.send("Unalthorized Access");
    }

    
});

app.get('/alunos/:id', (req, res)=>{
    if (req.session.login) {
        bd.getUserById;

            
    }
    else{
        res.send("Unalthorized Access");
    }
});

app.post('/alunos', async (req, res) => {
    try{
        let foundUser = bd.getUserById;
        if (!foundUser) {
    
    
            bd.createUser;
    
            res.send("Registration successful");
            
        } else {
            res.send("RGA already used");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.put('/alunos', async (req, res) => {
    try{
        let foundUser = bd.getUserById;
        if (foundUser) {

    
            bd.updateUser;
    
            res.send("Registration successful");
            
        } else {
            res.send("RGA not founded");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.delete('/alunos', async (req, res) => {
    try{
        let foundUser = bd.getUserById;
        if (foundUser) {
    
            bd.deleteUser;
    
            res.send("delete successful");
            
        } else {
            res.send("RGA not founded");
        }
    } catch{
        res.send("Internal server error");
    }
});


app.post('/login',async(req,res)=>{
    try{


        let foundUser =  bd.login;
        if (foundUser) {
            req.session.login = request.params.rga;
             res.send("login successful");
            } else {
                res.send("Invalid email or password");
            }
        
       
    } catch{
        res.send("Internal server error");
    }
});

app.get('/loginout',(req,res)=>{
    if (req.session.login) {
        req.session.destroy();
        res.send("Session Closed");
    }
    else{
        res.send("NOt legged");
    }
});