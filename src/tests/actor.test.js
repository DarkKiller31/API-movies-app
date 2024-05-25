const request = require('supertest');
const app = require('../app');

let id;

test('GET / actors debe traer todos los actores', async () => {
      const res = await request(app).get('/actors');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / actors debe crear un actor', async () => {
    const newActor = {
        "firstName": "Vin",
        "lastName": "Statham",
        "nationality": "Inglaterra",
        "image": "https://es.web.img3.acsta.net/c_310_420/pictures/19/07/31/17/35/5396784.jpg",
        "birthday": "1967-07-26"
    };

    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT / actors/:id debe de actualizar un actor', async() => {
    const updatedActor = {
        "firstName": "Jason"
    };
const res = await request(app).put('/actors/'+id).send(updatedActor);
expect(res.status).toBe(200);
expect(res.body.firstName).toBe(updatedActor.firstName);
});

test('DELETE / actors/:id debe eliminar un actor', async() => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204)
});