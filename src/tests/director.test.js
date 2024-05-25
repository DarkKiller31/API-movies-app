const request = require('supertest');
const app = require('../app');

let id;

test('GET / directors debe traer todos los directores', async () => {
      const res = await request(app).get('/directors');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / directors debe crear un director', async () => {
    const newDirector = {
        "firstName": "Carl",
        "lastName": "Leterrier",
        "nationality": "Francia",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSujmUlP7X7QR3DLtMg67r5SSxk9A0eDcDxisY-wGS9LMQxgUfq",
        "birthday": "1973-06-17"
    };

    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT / directors/:id debe de actualizar un director', async() => {
    const updatedDirector = {
        "firstName": "Louis",
    };
const res = await request(app).put('/directors/'+id).send(updatedDirector);
expect(res.status).toBe(200);
expect(res.body.firstName).toBe(updatedDirector.firstName);
});

test('DELETE / directors/:id debe eliminar un director', async() => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204)
});