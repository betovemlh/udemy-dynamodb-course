// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const AWS = require("aws-sdk");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

AWS.config.loadFromPath("config.json");

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  //response.sendFile(__dirname + "/views/index.html");
  response.send("Server Online");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

//let port=process.env.PORT||3000;
let port=3000;

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/listarTabelas", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var dynamodb = new AWS.DynamoDB();

  var params = {};
  dynamodb.listTables(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    // an error occurred
    else {
      response.json(data);
    }
  });
});

app.post("/inserirItem", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var email_cliente = request.body.email;
  var nome_cliente = request.body.name;
  var data_nascimento = request.body.data_nascimento;
  //console.log(JSON.stringify(request.body));
  
  
  var params = request.body;
  
  console.log(params);
  //return;
  client.put(params,function(err,data){
    if(err){
      console.log(err);
      response.send(err);
    }else{
      response.send(data);
    }
  })
});






app.put("/atualizarItem", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;
  //console.log(params);
  //return;
  client.update(params,function(err,data){
    if(err){
      console.log(err);
      response.send(err);
    }else{
      response.send(data);
    }
  })
});



app.delete("/excluirItem", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;
  //console.log(params);
  //return;
  client.delete(params,function(err,data){
    if(err){
      console.log(err);
      response.send(err);
    }else{
      response.send(data);
    }
  })
});




app.get("/getItemByKey", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;
  //Caso ConsistentRead true vai na tabela(strongly consistent, caso false vai no cache(eventual consistent)
   //Caso "ReturnConsumedCapacity":"TOTAL" retorna as unidades de capacidade utilizadas na request
  client.get(params,function(err,data){
    if(err){
      response.send(err);
      console.log(err);      
    }else{
      response.send(data);
    }
  })
});




app.get("/scan", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;

  client.scan(params,function(err,data){
    if(err){
      response.send(err);
      console.log(err);      
    }else{
      response.send(data);
    }
  })
});


app.get("/query", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;

  client.query(params,function(err,data){
    if(err){
      response.send(err);
      console.log(err);      
    }else{
      response.send(data);
    }
  })
});



app.get("/batchGet", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;

  client.batchGet(params,function(err,data){
    if(err){
      response.send(err);
      console.log(err);      
    }else{
      response.send(data);
    }
  })
});




app.post("/batchWrite", (request, response) => {
  AWS.config.update({ region: "us-east-1" });
  var client = new AWS.DynamoDB.DocumentClient();
  
  var params = request.body;

  client.batchWrite(params,function(err,data){
    if(err){
      response.send(err);
      console.log(err);      
    }else{
      response.send(data);
    }
  })
});




