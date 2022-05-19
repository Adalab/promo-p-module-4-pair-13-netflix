const express = require('express');
const cors = require('cors');
const movies = require('./src/data/movies.json');
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', { verbose: console.log });



// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
// Array guardado en movies para poder usarlo fuera
// const movies = [
//   {
//     id: '1',
//     title: 'Gambita de dama',
//     gender: 'Drama',
//     image: '//localhost:4000/gambita-de-dama.jpg'
//   },
//   {
//     id: '2',
//     title: 'Friends',
//     gender: 'Comedia',
//     image: '//localhost:4000/friends.jpg'
//   }
// ];

server.get('/movies', (req, res) => {
  // Aquí el select
  // preparamos la query
  const query = db.prepare('SELECT * FROM movies');
  // ejecutamos la query
  const movies = query.all();
  const response = {
    success: true,
    // Sacado el array en una constante y aquí se devuelve con el nombre de la constante
    movies: movies
  };
  res.json(response)
});
// Para conseguir el id de la película que se va a renderizar con movieId (endpoint)
server.get('/movie/:movieId', (req, res) => {
  // dentro del server.get hay que crear una constante para encontrar el id de las películas con req.params.movieId Este código es el del array de ExpressJs
  // const foundMovie = movies.find(movie => movie.id === req.params.movieId);
  // Es el SELECT de la db con un FROM para sacar la tabla movies y un WHERE para la fila que en este caso es el id
  const query = db.prepare('SELECT * FROM movies WHERE id=?');
  // ejecutamos la query con los parámetros del movieId
  const foundMovie = query.get(req.params.movieId);
  // Este es el primer console.log que en el ejercicio 1 de la lección 4
  console.log(req.params.movieId);
  // Los dos console.log muestran exactamente lo mismo
  console.log(foundMovie);
  // Esta respuesta la he puesto para que el navegador no se quede pillado sin encontrar una respuesta que devolver
  res.json(null);
});


server.use(express.json());
// En esta carpeta hemos creado un servidor estático dónde ponemos los ficheros estáticos
const staticServer = "./public";
server.use(express.static(staticServer));

// En esta carpeta hemos creado un servidor estático dónde guardamos imágenes
const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));


