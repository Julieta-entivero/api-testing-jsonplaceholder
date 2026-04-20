const request = require('supertest');
const { expect } = require('chai');
const { baseUrl } = require('../config');

describe('API de Tareas (Todos)', () => {

  describe('GET /todos', () => {
    it('Debe listar todas las tareas (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/todos')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('Debe validar la estructura de datos de cada tarea', async () => {
      const res = await request(baseUrl)
        .get('/todos?_limit=5')
        .expect(200);

      res.body.forEach((todo) => {
        expect(todo).to.have.property('userId').that.is.a('number');
        expect(todo).to.have.property('id').that.is.a('number');
        expect(todo).to.have.property('title').that.is.a('string');
        expect(todo).to.have.property('completed').that.is.a('boolean');
      });
    });

    it('Debe filtrar tareas completadas', async () => {
      const res = await request(baseUrl)
        .get('/todos?completed=true&_limit=10')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((todo) => {
        expect(todo.completed).to.be.true;
      });
    });

    it('Debe filtrar tareas pendientes', async () => {
      const res = await request(baseUrl)
        .get('/todos?completed=false&_limit=10')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((todo) => {
        expect(todo.completed).to.be.false;
      });
    });

    it('Debe filtrar tareas por userId', async () => {
      const userId = 1;

      const res = await request(baseUrl)
        .get(`/todos?userId=${userId}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((todo) => {
        expect(todo.userId).to.equal(userId);
      });
    });
  });

  describe('GET /todos/:id', () => {
    it('Debe obtener una tarea especifica por ID (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/todos/1')
        .expect(200);

      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('userId').that.is.a('number');
      expect(res.body).to.have.property('title').that.is.a('string');
      expect(res.body).to.have.property('completed').that.is.a('boolean');
    });

    it('Debe retornar 404 para una tarea inexistente', async () => {
      await request(baseUrl)
        .get('/todos/9999')
        .expect(404);
    });
  });

  describe('POST /todos', () => {
    it('Debe crear una nueva tarea (status 201)', async () => {
      const nuevaTarea = {
        title: 'Completar suite de tests automatizados',
        completed: false,
        userId: 1
      };

      const res = await request(baseUrl)
        .post('/todos')
        .send(nuevaTarea)
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(res.body).to.have.property('title', nuevaTarea.title);
      expect(res.body).to.have.property('completed', false);
      expect(res.body).to.have.property('userId', nuevaTarea.userId);
      expect(res.body).to.have.property('id').that.is.a('number');
    });
  });

  describe('PUT /todos/:id', () => {
    it('Debe actualizar una tarea completa (status 200)', async () => {
      const tareaActualizada = {
        userId: 1,
        title: 'Tarea actualizada completamente',
        completed: true
      };

      const res = await request(baseUrl)
        .put('/todos/1')
        .send(tareaActualizada)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('title', tareaActualizada.title);
      expect(res.body).to.have.property('completed', true);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('Debe marcar una tarea como completada (status 200)', async () => {
      const actualizacion = {
        completed: true
      };

      const res = await request(baseUrl)
        .patch('/todos/1')
        .send(actualizacion)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('completed', true);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('Debe eliminar una tarea existente (status 200)', async () => {
      const res = await request(baseUrl)
        .delete('/todos/1')
        .expect(200);

      expect(res.body).to.be.an('object').that.is.empty;
    });
  });

});
