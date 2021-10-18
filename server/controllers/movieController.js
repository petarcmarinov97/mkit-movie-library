const { movieModel } = require('../models');
const { userModel } = require('../models');

function addMovieFavorite ( req, res, next ){
    let movie = req.body;
    let userId=movie.userId;

    userModel.findOneAndUpdate({ _id: userId }, { $push: { movies: movie } }, { new: true })
        .then(x => res.send(x.movies))
        .catch(next);
}

function getMovieFavorite( req, res, next){
    let { id }=req.params;
    userModel.findById(id).select({ movies: 1 })
    .then(movies => {
        res.send(movies)
    })
    .catch(next);
}


//Remove Movie from Favorites method: $pull
function removeMovieFavorite ( req, res, next ){
    let movie = req.body;
    let userId=movie.userId;
    const movieId = movie.movieId.toString()

    userModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: { movieId: movieId } } }, { new: true })
        .then(x => res.send(x.movies))
        .catch(next);
}


async function updateMovieRating ( req, res, next ){
    const data = await req.body;
    const movieId = data.movieId.toString();
    const rating = Number(data.rating);
    const userId = data.userId;
    const obj={
        movieId:movieId,
        rating:rating,
        notes:''
    }
    if(userModel.find({_id:userId, 'postMovies.movieId': movieId})){
        userModel.findOneAndUpdate({ _id: userId }, { $set: {"moviePosts.$[elem].rating": rating } },  {arrayFilters: [ { "elem.movieId": movieId } ], new:true, upsert: true})
            .then(x => res.send(x.moviePosts))
            .catch(next);
    }else{
        userModel.findOneAndUpdate({ _id: userId }, { $addToSet: {obj} })
            .then(x => res.send(x.moviePosts))
            .catch(next);
    }
}

async function addMovieNotes ( req, res, next ){
    const data = req.body;
    const movieId = data.movieId.toString();
    const notes = data.notes;
    const userId = data.userId;
    userModel.findOneAndUpdate({ _id: userId }, { $set: {"moviePosts.$[elem].notes": notes } },  {arrayFilters: [ { "elem.movieId": movieId } ], new:true, upsert: true})
        .then(x => res.send(x.moviePosts))
        .catch(next);
}

function getMoviePosts( req, res, next ){
    const userId = req.params.id;
    userModel.findById(userId)
        .then(x => {
            if(x.moviePosts){
                res.send(x.moviePosts)
            } else {
                res.send([])
            }
        })
        .catch(next);
}

module.exports = {
    addMovieFavorite,
    getMovieFavorite,
    removeMovieFavorite,
    updateMovieRating,
    addMovieNotes,
    getMoviePosts
}
