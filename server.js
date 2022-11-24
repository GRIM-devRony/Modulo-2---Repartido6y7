const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args)); 
const api = "https://api.thedogapi.com/v1/images/search"; 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//CALCULADORA
app.post('/',(req,res)=>{
    const n1 = Number(req.body.num1)
    const n2 = Number(req.body.num2)
    const op = req.body.operacion;
    let resultado;
    switch (op) {
      case '+':
        resultado = Number(n1 + n2);
       
          break;
      case '-':
          resultado = Number(n1-n2);
         
          break;
      case '%':
          resultado = Number(n1/n2);
         
          break;
      case '*':
          resultado = Number(n1*n2);
          
          break;
          default:
            break
  
  }
    res.json({Mensaje:`El resultado de de su operación es ${resultado}`})
  })

//CALCULADORA DE IMC

app.get('/imc', (req,res)=>{
    res.sendFile(__dirname + '/public/imc.html');
})

app.post('/imc', (req,res) => {
    let peso = Number(req.body.peso)
    let altura = Number(req.body.altura)
    altura = Math.round(altura) / 100;
    let IMC = Math.round(peso / Math.pow(altura, 2));
    
    if (IMC < 20) {
					
       res.json({Mensaje:`Usted sufre de bajo peso, su IMC es: ${IMC}`});
    }else if (IMC >= 20 && IMC <= 25) {
        res.json({Mensaje:`Su peso es el normal, su IMC es: ${IMC}`});

    }else if (IMC >= 25 && IMC <= 27.5) {
      res.json({Mensaje:`Usted tiene sobrepeso, su IMC es: ${IMC}`});
    
    }else if (IMC >= 27.5 && IMC <= 29.9) {
        res.json({Mensaje:`Usted tiene obesidad leve (TIPO I), su IMC es: ${IMC}`});

    }else if (IMC >= 29.9 && IMC <= 39.9) {
        res.json({Mensaje:`Usted tiene obesidad moderada (TIPO II) , su IMC es: ${IMC}`});

    }else if (IMC > 39.9) {
        res.json({Mensaje:`Usted tiene obesidad severa (TIPO III) , su IMC es: ${IMC}`});   
    }
})

//API RENDER
app.get("/api", (req, res) => {
    async function Setimagenes() {
      const respuesta = await fetch(api);
      const data = await respuesta.json();
      res.json(data);
    }
    Setimagenes();
  });
  
  //FORMULARIO
  app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/form.html");
  });

  app.post("/form", (req, res) => {
    const nom = req.body.nombre;
    const ape = req.body.apellido;
  
    res.send(
      `<h1 class="agradecimiento"> Gracias ${nom} ${ape}, por ser parte de nosotros</h1>`
    );
  });
  
  app.listen(3000);