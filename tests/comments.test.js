const request = require('supertest');
const { expect } = require('chai');
const { baseUrl } = require('../config');

describe('API de Comentarios', () => {

  describe('GET /comments', () => {
    it('Debe listar todos los comentarios (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/comments')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('Debe validar la estructura de datos de cada comentario', async () => {
      const res = await request(baseUrl)
        .get('/comments?_limit=5')
        .expect(200);

      res.body.forEach((comment) => {
        expect(comment).to.have.property('postId').that.is.a('number');
        expect(comment).to.have.property('id').that.is.a('number');
        expect(comment).to.have.property('name').that.is.a('string');
        expect(comment).to.have.property('email').that.is.a('string');
        expect(comment).to.have.property('body').that.is.a('string');
      });
    });

    it('Debe filtrar comentarios por postId', async () => {
      const postId = 1;

      const res = await request(baseUrl)
        .get(`/comments?postId=${postId}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((comment) => {
        expect(comment.postId).to.equal(postId);
      });
    });

    it('Debe validar el formato de email en los comentarios', async () => {
      const res = await request(baseUrl)
        .get('/comments?_limit=10')
        .expect(200);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      res.body.forEach((comment) => {
        expect(comment.email).to.match(emailRegex);
      });
    });

    it('Debe respetar el limite de resultados con _limit', async () => {
      const limit = 3;
      const res = await request(baseUrl)
        .get(`/comments?_limit=${limit}`)
        .expect(200);

      expect(res.body).to.have.length(limit);
    });
  });

  describe('GET /comments/:id', () => {
    it('Debe obtener un comentario especifico por ID (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/comments/1')
        .expect(200);

      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('postId').that.is.a('number');
      expect(res.body).to.have.property('name').that.is.a('string');
      expect(res.body).to.have.property('email').that.is.a('string');
      expect(res.body).to.have.property('body').that.is.a('string');
    });

    it('Debe retornar 404 para un comentario inexistente', async () => {
      await request(baseUrl)
        .get('/comments/9999')
        .expect(404);
    });
  });

  describe('POST /comments', () => {
    it('Debe crear un nuevo comentario (status 201)', async () => {
      const nuevoComentario = {
        postId: 1,
        name: 'Test comment',
        email: 'test@example.com',
        body: 'Este comentario fue creado por tests automatizados'
      };

      const res = await request(baseUrl)
        .post('/comments')
        .send(nuevoComentario)
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(res.body).to.have.property('postId', nuevoComentario.postId);
      expect(res.body).to.have.property('name', nuevoComentario.name);
      expect(res.body).to.have.property('email', nuevoComentario.email);
      expect(res.body).to.have.property('id').that.is.a('number');
    });
  });

  describe('DELETE /comments/:id', () => {
    it('Debe eliminar un comentario existente (status 200)', async () => {
      const res = await request(baseUrl)
        .delete('/comments/1')
        .expect(200);

      expect(res.body).to.be.an('object').that.is.empty;
    });
  });

});
