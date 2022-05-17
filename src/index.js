const express = require('express');
const cors = require('cors');



// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const response = {

    success: true,
    movies: [
      {
        id: '1',
        title: 'Gambita de dama',
        gender: 'Drama',
        image: '//localhost:4000/gambita-de-dama.jpg'
      },
      {
        id: '2',
        title: 'Friends',
        gender: 'Comedia',
        image: '//localhost:4000/friends.jpg'
      }

    ]

  };
  res.json(response)
});

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
});

const foundMovie = movieId.find();



server.use(express.json());
// En esta carpeta ponemos los ficheros estáticos
const staticServer = "./public";
server.use(express.static(staticServer));

// En esta carpeta guardamos imágenes
const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));


