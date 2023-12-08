import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getMovies, getMovie, getGenres, 
    getUpcomingReleases, getPopularReleases, getTopRatedReleases, 
    getMovieRecommendations } 
    from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/discover/:page', asyncHandler(async (req, res) => {
    const movies = await getMovies(req.params.page);
    res.status(200).json(movies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

router.get('/tmdb/movie/:id/recommendations', asyncHandler(async (req, res) => {
    const movieRecommendations = await getMovieRecommendations(req.params.id);
    res.status(200).json(movieRecommendations);
}));

router.get('/tmdb/upcoming/:page', asyncHandler(async (req, res) => {
    const upcomingReleases = await getUpcomingReleases(req.params.page);
    res.status(200).json(upcomingReleases);
}));

router.get('/tmdb/popular/:page', asyncHandler(async (req, res) => {
    const popularReleases = await getPopularReleases(req.params.page);
    res.status(200).json(popularReleases);
}));

router.get('/tmdb/topRated/:page', asyncHandler(async (req, res) => {
    const topRatedReleases = await getTopRatedReleases(req.params.page);
    res.status(200).json(topRatedReleases);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

export default router;