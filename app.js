var express = require("express"); /* IMPORTA O EXPRESS*/ 

var app = express(); //START EXPRESS

app.listen(process.env.PORT || 3003,()=>{                                   //COLOCA O APP PARA ESCUTAR NA PORTA 3003 E
    console.log("Server running on port 3003");         //FAZ UM CALLBACK RETORNADO RODANDO EM....
});

app.get("/food",(req, res)=>{                      //DEFINE UMA RESPOSTA PARA GET
    res.json(["Arroz", "feijão", "bife"]);              //req = request body | informações sobre o request
});                                                     //res = response body | informações