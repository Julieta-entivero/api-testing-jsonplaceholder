const request = require('supertest');
const { expect } = require('chai');
const { baseUrl } = require('../config');

describe('API de Usuarios', () => {

  describe('GET /users', () => {
    it('Debe listar todos los usuarios (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/users')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('Debe validar la estructura de datos de cada usuario', async () => {
      const res = await request(baseUrl)
        .get('/users?_limit=3')
        .expect(200);

      res.body.forEach((user) => {
        expect(user).to.have.property('id').that.is.a('number');
        expect(user).to.have.property('name').that.is.a('string');
        expect(user).to.have.property('username').that.is.a('string');
        expect(user).to.have.property('email').that.is.a('string');
        expect(user).to.have.property('address').that.is.an('object');
        expect(user).to.have.property('phone').that.is.a('string');
        expect(user).to.have.property('website').that.is.a('string');
        expect(user).to.have.property('company').that.is.an('object');
      });
    });

    it('Debe validar la estructura de direccion del usuario', async () => {
      const res = await request(baseUrl)
        .get('/users/1')
        .expect(200);

      const { address } = res.body;
      expect(address).to.have.property('street').that.is.a('string');
      expect(address).to.have.property('suite').that.is.a('string');
      expect(address).to.have.property('city').that.is.a('string');
      expect(address).to.have.property('zipcode').that.is.a('string');
      expect(address).to.have.property('geo').that.is.an('object');
      expect(address.geo).to.have.property('lat').that.is.a('string');
      expect(address.geo).to.have.property('lng').that.is.a('string');
    });
  });

  describe('GET /users/:id', () => {
    it('Debe obtener un usuario especifico por ID (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/users/1')
        .expect(200);

      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('name').that.is.a('string').and.not.empty;
      expect(res.body).to.have.property('username').that.is.a('string').and.not.empty;
      expect(res.body).to.have.property('email').that.includes('@');
    });

    it('Debe retornar 404 para un usuario inexistente', async () => {
      await request(baseUrl)
        .get('/users/9999')
        .expect(404);
    });
  });

  describe('POST /users', () => {
    it('Debe crear un nuevo usuario (status 201)', async () => {
      const nuevoUsuario = {
        name: 'Julieta Entivero',
        username: 'jentivero',
        email: 'julieta@example.com'
      };

      const res = await request(baseUrl)
        .post('/users')
        .send(nuevoUsuario)
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(res.body).to.have.property('name', nuevoUsuario.name);
      expect(res.body).to.have.property('username', nuevoUsuario.username);
      expect(res.body).to.have.property('email', nuevoUsuario.email);
      expect(res.body).to.have.property('id').that.is.a('number');
    });

    it('Debe aceptar un usuario con body vacio', async () => {
      const res = await request(baseUrl)
        .post('/users')
        .send({})
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(res.body).to.have.property('id').that.is.a('number');
    });
  });

  describe('PUT /users/:id', () => {
    it('Debe actualizar un usuario existente (status 200)', async () => {
      const datosActualizados = {
        name: 'Julieta Entivero',
        username: 'jentivero',
        email: 'julieta.updated@example.com'
      };

      const res = await request(baseUrl)
        .put('/users/1')
        .send(datosActualizados)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('name', datosActualizados.name);
      expect(res.body).to.have.property('email', datosActualizados.email);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('PATCH /users/:id', () => {
    it('Debe actualizar parcialmente un usuario (status 200)', async () => {
      const actualizacionParcial = {
        email: 'nuevo.email@example.com'
      };

      const res = await request(baseUrl)
        .patch('/users/1')
        .send(actualizacionParcial)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('email', actualizacionParcial.email);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('DELETE /users/:id', () => {
    it('Debe eliminar un usuario existente (status 200)', async () => {
      const res = await request(baseUrl)
        .delete('/users/1')
        .expect(200);

      expect(res.body).to.be.an('object').that.is.empty;
    });
  });

});
