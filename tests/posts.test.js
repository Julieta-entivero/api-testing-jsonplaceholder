const request = require('supertest');
const { expect } = require('chai');

const baseUrl = 'https://jsonplaceholder.typicode.com';

describe('API de Posts', () => {

  describe('GET /posts', () => {
    it('Debe listar todos los posts (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/posts')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(100);
    });

    it('Debe validar la estructura de datos de cada post', async () => {
      const res = await request(baseUrl)
        .get('/posts')
        .expect(200);

      res.body.forEach((post) => {
        expect(post).to.have.property('userId').that.is.a('number');
        expect(post).to.have.property('id').that.is.a('number');
        expect(post).to.have.property('title').that.is.a('string');
        expect(post).to.have.property('body').that.is.a('string');
      });
    });

    it('Debe filtrar posts por userId mediante query params', async () => {
      const userId = 1;

      const res = await request(baseUrl)
        .get(`/posts?userId=${userId}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((post) => {
        expect(post.userId).to.equal(userId);
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('Debe obtener un post especifico por ID (status 200)', async () => {
      const res = await request(baseUrl)
        .get('/posts/1')
        .expect(200);

      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('userId', 1);
      expect(res.body).to.have.property('title').that.is.a('string');
      expect(res.body).to.have.property('body').that.is.a('string');
    });

    it('Debe retornar 404 para un post inexistente', async () => {
      await request(baseUrl)
        .get('/posts/9999')
        .expect(404);
    });
  });

  describe('GET /posts/:id/comments', () => {
    it('Debe obtener los comentarios de un post especifico', async () => {
      const res = await request(baseUrl)
        .get('/posts/1/comments')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      res.body.forEach((comment) => {
        expect(comment).to.have.property('postId', 1);
        expect(comment).to.have.property('id').that.is.a('number');
        expect(comment).to.have.property('name').that.is.a('string');
        expect(comment).to.have.property('email').that.is.a('string');
        expect(comment).to.have.property('body').that.is.a('string');
      });
    });
  });

  describe('POST /posts', () => {
    it('Debe crear un nuevo post (status 201)', async () => {
      const nuevoPost = {
        title: 'Test de automatizacion',
        body: 'Este post fue creado mediante tests automatizados',
        userId: 1
      };

      const res = await request(baseUrl)
        .post('/posts')
        .send(nuevoPost)
        .set('Content-Type', 'application/json')
        .expect(201);

      expect(res.body).to.have.property('title', nuevoPost.title);
      expect(res.body).to.have.property('body', nuevoPost.body);
      expect(res.body).to.have.property('userId', nuevoPost.userId);
      expect(res.body).to.have.property('id').that.is.a('number');
    });
  });

  describe('PUT /posts/:id', () => {
    it('Debe actualizar un post existente (status 200)', async () => {
      const postActualizado = {
        id: 1,
        title: 'Titulo actualizado',
        body: 'Contenido actualizado del post',
        userId: 1
      };

      const res = await request(baseUrl)
        .put('/posts/1')
        .send(postActualizado)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('title', postActualizado.title);
      expect(res.body).to.have.property('body', postActualizado.body);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('PATCH /posts/:id', () => {
    it('Debe actualizar parcialmente un post (status 200)', async () => {
      const actualizacionParcial = {
        title: 'Solo el titulo fue modificado'
      };

      const res = await request(baseUrl)
        .patch('/posts/1')
        .send(actualizacionParcial)
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(res.body).to.have.property('title', actualizacionParcial.title);
      expect(res.body).to.have.property('id', 1);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('Debe eliminar un post existente (status 200)', async () => {
      await request(baseUrl)
        .delete('/posts/1')
        .expect(200);
    });
  });

});
