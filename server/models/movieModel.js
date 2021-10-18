const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
    imgUrl: String,
    movieId: String,
    title: String,
    year: String,
    post: String,
    rating: Number,
    notes: String
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Movie;
