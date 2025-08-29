const express = require('express');
const router = express.Router();
let albums = require('../data');

// GET all albums
router.get('/', (req, res) => {
    res.json(albums);
});

// GET a single album by id
router.get('/:id', (req, res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('The album with the given ID was not found.');
    res.json(album);
});

// POST a new album
router.post('/', (req, res) => {
    const newAlbum = {
        id: albums.length + 1,
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year
    };
    albums.push(newAlbum);
    res.status(201).json(newAlbum);
});

// PUT to update an album
router.put('/:id', (req, res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('The album with the given ID was not found.');

    album.title = req.body.title;
    album.artist = req.body.artist;
    album.year = req.body.year;

    res.json(album);
});

// DELETE an album
router.delete('/:id', (req, res) => {
    const albumIndex = albums.findIndex(a => a.id === parseInt(req.params.id));
    if (albumIndex === -1) return res.status(404).send('The album with the given ID was not found.');

    const deletedAlbum = albums.splice(albumIndex, 1);
    res.json(deletedAlbum);
});

module.exports = router;
