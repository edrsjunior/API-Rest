const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('../data/data.js').userDB;

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

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


app.post('/login',async(req,res)=>{
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});