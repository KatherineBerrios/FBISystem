// Importando librerías
const express = require("express");
const path = require("path");

// Crea una instancia de Express
const app = express();

// Importando datos desde archivo agentes.js
const agentes = require("./data/agentes.js");

//Configurar el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname, "/index.html")));

//Configurar el servidor para recibir payloads
app.use(express.json());

// Ruta raíz GET para servir index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Generando un nuevo token
const jwt = require("jsonwebtoken");

// Llave para firmar los tokens
const secretKey = "Mi Llave Ultra Secreta";

// Modificar la respuesta de la ruta GET /auth para devolver el nuevo token generado
app.get("/auth", (req, res) => {
  // Extraer de las query Strings los parámetros email y password
  const { email, password } = req.query;
  // Método find para encontrar algún usuario que coincida con las credenciales recibidas
  const agente = agentes.find(
    (agente) => agente.email == email && agente.password == password
  );
  // Evalúa si el método find encontró un usuario con el email y password recibida
  if (agente) {
    // Si lo encuentra, genera un token que expire en 2 minutos
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: agente,
      },
      secretKey
    );
    // Muestra un mensaje de bienvenida utilizando el dato del email y persiste el token en el navegador
    res.send(`
    <h1>Token para:</h1>
    <p style="font-size:23px">${email}</p>
    <p>${token}</p>
    `);
  } else {
    // Devuelve un mensaje en caso de no encontrar un usuario con los datos ingresados
    res.send(`<p><h1>❌ Usuario o contraseña incorrecta ❌</h1></p>`);
  }
});

// Ruta GET /token
app.get("/token", (req, res) => {
  // Almacenar en una constante el parámetro “token” extraído con query strings;
  const { token } = req.query;
  // Verificar el token recibido y devolver el payload decodificado o un mensaje de error
  jwt.verify(token, secretKey, (err, data) => {
    res.send(
      err
      ? `<p><h1>❌ Token inválido ❌</h1></p>`
      : data);
  });
});

// Ruta GET /SignIn
app.get("/SignIn", (req, res) => {
  // Extraer de las query strings los parámetros email y password
  const { email, password } = req.query;
  // Método find para encontrar algún usuario que coincida con las credenciales recibidas
  const agente = agentes.find(
    (agente) => agente.email == email && agente.password == password
  );
  // Evalúa si el método find encontró un usuario con el email y password recibida
  if (agente) {
    // Si lo encuentra, genera un token que expire en 2 minutos
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: agente,
      },
      secretKey
    );
    // Dirige a una ruta /restricted, da la bienvenida utilizando el dato del email y persiste el token en el navegador
    res.send(`
    <a href="/restricted?token=${token}" style="text-decoration: none; color: red"><p><h1>⚠ Ir al área restringida ⚠</h1>
    </p></a>
    <p style="font-size:23px">${email}</p>
    <script>
    localStorage.setItem('token', JSON.stringify("${token}"))
    </script>
    `);
  } else {
    // Devuelve un mensaje en caso de no encontrar un usuario con los datos ingresados
    res.send(`<p><h1>❌ Usuario o contraseña incorrecta ❌</h1></p>`);
  }
});

// Ruta GET /dashboard
app.get("/restricted", (req, res) => {
  // Almacenar en una constante el parámetro “token” extraído con query strings;
  const { token } = req.query;
  // Verificar el token recibido y devolver el payload decodificado o un mensaje de error
  jwt.verify(token, secretKey, (err, decoded) => {
    // Si hay un error, devuelve el código de estado 401
    err
      ? res.status(401).send(`
          <p><h1>
          Error 401 Unauthorized</h1></p>
          <p style="font-size:23px">${err.message}</p>
        <button>
        <a href="/#" style="text-decoration: none">Volver al inicio</a>
        </button>
        `)
      : // Si no hay un error, devuelve el mensaje de bienvenida
        res.send(
          `<p><h1>Te damos la bienvenida, ${decoded.data.email} &#128373</p></h1>`
        );
  });
});

//Crear un servidor con Express en el puerto 3000
app.listen(3000, () => console.log("Your app listening on port 3000"));