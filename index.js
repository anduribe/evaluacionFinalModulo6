const express = require("express");
const app = express();

// Configuración del servidor

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// Implementación del CRUD

const fs = require("fs");

// Ruta al archivo animes.json
const animeFilePath = "./animes.json";

// Función para leer los datos del archivo animes.json
function leerDatosAnime() {
  const data = fs.readFileSync(animeFilePath, "utf8");
  return JSON.parse(data);
}

// Función para guardar los datos en el archivo animes.json
function guardarDatosAnime(datos) {
  const data = JSON.stringify(datos, null, 2);
  fs.writeFileSync(animeFilePath, data);
}

// Rutas para las operaciones CRUD

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenidos a nuestros tests!");
});

// Obtener todos los animes
app.get("/animes", (req, res) => {
  const datosAnime = leerDatosAnime();
  res.json(datosAnime);
});

// Obtener un anime por ID
app.get("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatosAnime();
  const anime = datosAnime[id];
  res.json(anime);
});

// Obtener un anime por nombre
app.get("/animes/nombre/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const datosAnime = leerDatosAnime();
  const anime = Object.values(datosAnime).find(
    (anime) => anime.nombre.toLowerCase() === nombre.toLowerCase()
  );
  res.json(anime);
});

// Crear un nuevo anime
app.post("/animes", (req, res) => {
  const nuevoAnime = req.body;
  const datosAnime = leerDatosAnime();
  const nuevoId = Object.keys(datosAnime).length + 1;
  datosAnime[nuevoId] = nuevoAnime;
  guardarDatosAnime(datosAnime);
  res.json({ mensaje: "Anime creado exitosamente" });
});

// Actualizar un anime existente
app.put("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatosAnime();
  if (datosAnime.hasOwnProperty(id)) {
    const animeActualizado = req.body;
    datosAnime[id] = animeActualizado;
    guardarDatosAnime(datosAnime);
    res.json({ mensaje: "Anime actualizado exitosamente" });
  } else {
    res.status(404).json({ mensaje: "Anime no encontrado" });
  }
});

// Eliminar un anime existente
app.delete("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatosAnime();
  if (datosAnime.hasOwnProperty(id)) {
    delete datosAnime[id];
    guardarDatosAnime(datosAnime);
    res.json({ mensaje: "Anime eliminado exitosamente" });
  } else {
    res.status(404).json({ mensaje: "Anime no encontrado" });
  }
});

module.exports = app;
