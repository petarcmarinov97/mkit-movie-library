const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController, postController } = require('../controllers');

// middleware that is specific to this router

router.post('/favorites/add', auth(), movieController.addMovieFavorite);
router.post('/favorites/remove', auth(), movieController.removeMovieFavorite);
router.post('/movie/rating', auth(), movieController.updateMovieRating);
router.post('/movie/notes', auth(), movieController.addMovieNotes);
router.get('/movie-posts/:id', auth(), movieController.getMoviePosts);
router.get('/favorites/:id', auth(), movieController.getMovieFavorite);

module.exports = router