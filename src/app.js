const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const users = require('../data/data.js').userDB;
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

/*app.get('/findPessoa',(req,res)=>{

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
        let foundUser = users.find((data) => req.body.rga === data.rga);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.senha, 10);
    
            let newUser = {
                id: Date.now(),
                rga: req.body.rga,
                dataNasc: req.body.data_nascimento,
                endereco: req.body.endereco,
                email: req.body.email,
                password: hashPassword,
                telefone: req.body.telefone
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
        let foundUser = users.find((data) => req.body.rga === data.rga);
        if (foundUser) {
    
            let submittedPass = req.body.senha; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.rga;
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

app.get('/loginout',(req,res)=>{
    if (req.session.login) {
        req.session.destroy();
        res.send("Session Closed");
    }
    else{
        res.send("NOt legged");
    }
});