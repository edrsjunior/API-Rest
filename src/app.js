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
    if (req.session.login) {
        res.send('OK');
    }
    else{
        res.send("Unalthorized Access");
    }

});

/*app.get('/pessoas',(req,res)=>{

    if (req.session.login) {
        const {pessoa_id} = req.params;
        const onePessoaGet = users.find((pessoa)=>pessoa.id === pessoa_id);

            return res.status(200).json(onePessoaGet);
    }
    else{
        res.send("Unalthorized Access");
    }

    
});*/

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
    
            res.send("Registration successful");
        } else {
            res.send("Email already used");
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
                req.session.login = usrname;
                res.send(`login successful, hello ${usrname}`);
            } else {
                res.send("Invalid email or password");
            }
        }
        else {
            res.send("Invalid email or password");
        }
    } catch{
        res.send("Internal server error");
    }
});