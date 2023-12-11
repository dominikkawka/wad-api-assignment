import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import MovieReview from './movieReviewModel'

const router = express.Router(); // eslint-disable-line

router.get('/', async (req, res) => {
    const movieReviews = await MovieReview.find();
    res.status(200).json(movieReviews);
});

router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.movieId || !req.body.reviewId) {
            return res.status(400).json({ success: false, msg: 'MovieID and ReviewID is required.' });
        }
        if (req.query.action === 'submit') {
            await submitReview(req, res); 
         }
      } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

router.delete('/:reviewId', asyncHandler(async (req, res) => {
   deleteReview(req, res)
}))

router.get('/:movieId', async (req, res) => {
    const movieReviews = await MovieReview.findByMovieId(req.params.movieId);
    res.status(200).json(movieReviews);
});

async function submitReview(req, res) {
    // Add input validation logic here
    await MovieReview.create(req.body);
    res.status(201).json({ success: true, msg: 'MovieReview successfully created.' });
}

async function deleteReview(req, res) {
   const reviewId = req.params.reviewId;
   try {
       const deletedReview = await MovieReview.findByReviewId(reviewId);
       if (!deletedReview) {
           return res.status(404).json({ success: false, msg: 'Review not found.' });
       }
       await MovieReview.removeByReviewId(reviewId)
       res.json({ success: true, msg: 'MovieReview successfully deleted.' });
   } catch (error) {
       res.status(500).json({ success: false, msg: 'Failed to delete review.', error: error.message });
   }
}

export default router;