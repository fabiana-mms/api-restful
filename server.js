const express = require("express"); // chamando o express
const app = express(); // instanciando o express
const data = require("./data.json"); //chamando os dados, mas normalmente chama-se do banco de dados

app.use(express.json()); //pedindo ao express usar json

//Pegando todos os dados dos clientes na base de dados
app.get("/clients", function (req, res) {
   res.json(data);
});

//Selecionar um client específico inserindo um id
app.get("/clients/:id", function (req, res) {
   const { id } = req.params; //criando a variável para requisitar por parâmetros
   const client = data.find(cli => cli.id == id); //procurar um cliente por id

   if (!client) return res.status(204).json(); //Se caso não houver um client, retornará um erro "No content"

   res.json(client); //retorna o cliente solicitado a API
});

//Salvando novos dados do cliente
app.post("/clients", function (req, res) {
   const { name, email } = req.body; //requisitando o nome e o email do body

   //Salvar
   res.json({ name, email }); //lógica para salvar um novo cliente e enviar uma resposta para ele de OK
});

//Atualizando dados de cliente da base de dados
app.put("/clients/:id", function (req, res) {
   const { id } = req.params;
   const client = data.find(cli => cli.id == id);

   if (!client) return res.status(204).json();

   const { name } = req.body; //requisitando o nome do body

   client.name = name;

   res.json(client); //atualizando o novo nome e um status de OK para o cliente
});


app.delete("/clients/:id", function (req, res) {
   const { id } = req.params;

   const clientFiltered = data.filter(client => client.id != id); //filtar todos os clientes que o id seja diferente do que aquele passando no pedido, exemplo: será pedido o id: 1

   res.json(clientFiltered); //retorna uma lista nova, com o cliente 1 deletado;
});

app.listen(3000, function () { // Iniciando o servidor
   console.log("Server is running");
});

