const request = require('supertest');
const app = require('../app');
let albums = require('../data');

describe('Albums API', () => {
    beforeEach(() => {
        // Reset data before each test
        albums.splice(0, albums.length,
            { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },
            { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },
            { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 }
        );
    });

    it('should get all albums', async () => {
        const res = await request(app).get('/albums');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(3);
    });

    it('should get a single album by id', async () => {
        const res = await request(app).get('/albums/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Abbey Road');
    });

    it('should return 404 for a non-existent album', async () => {
        const res = await request(app).get('/albums/99');
        expect(res.statusCode).toEqual(404);
    });

    it('should create a new album', async () => {
        const res = await request(app)
            .post('/albums')
            .send({
                title: 'New Album',
                artist: 'New Artist',
                year: 2025
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'New Album');
        expect(albums.length).toBe(4);
    });

    it('should update an album', async () => {
        const res = await request(app)
            .put('/albums/1')
            .send({
                title: 'Updated Abbey Road',
                artist: 'The Beatles',
                year: 1969
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Abbey Road');
    });

    it('should delete an album', async () => {
        const res = await request(app).delete('/albums/1');
        expect(res.statusCode).toEqual(200);
        expect(albums.length).toBe(2);
    });
});
