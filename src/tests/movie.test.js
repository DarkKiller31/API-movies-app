const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let id;

test('GET / movies debe traer todas las peliculas', async () => {
      const res = await request(app).get('/movies');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / movies debe crear una pelicula', async () => {
    const newMovie = {
        "name": "The Fast and the Fire",
        "image": "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "synopsis": "El oficial de policía de Los Ángeles Brian O'Conner debe decidir dónde está realmente su lealtad cuando se enamora del mundo de las carreras callejeras que ha sido enviado a destruir.",
        "releaseYear": "2001"
    };

    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test('PUT / movies/:id debe de actualizar una pelicula', async() => {
    const updateMovie = {
      "name": "The Fast and the Furious"
    };
const res = await request(app).put('/movies/'+id).send(updateMovie);
expect(res.status).toBe(200);
expect(res.body.name).toBe(updateMovie.name);
});

test('POST / movies/:id/actors debe insertar los actores a una pelicula', async () => {
  const actor = await Actor.create({
        firstName: "Vin",
        lastName: "Statham",
        nationality: "Inglaterra",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/19/07/31/17/35/5396784.jpg",
        birthday: "1967-07-26"
  })
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1)
})

test('POST / movies/:id/directors debe insertar los directores a una pelicula', async () => {
  const director = await Director.create({
      firstName: "Carl",
      lastName: "Leterrier",
      nationality: "Francia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSujmUlP7X7QR3DLtMg67r5SSxk9A0eDcDxisY-wGS9LMQxgUfq",
      birthday: "1973-06-17"
  })
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1)
})

test('POST / movies/:id/genres debe insertar los generos a una pelicula', async () => {
  const genre = await Genre.create({
        name: 'Terror'
  })
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1)
})

test('DELETE / movies/:id debe eliminar una pelicula', async() => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204)
});