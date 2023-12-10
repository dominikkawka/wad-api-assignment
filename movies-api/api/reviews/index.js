import asyncHandler from 'express-async-handler';
import express from 'express';
import movieReviewModel from './movieReviewModel';

const router = express.Router();


// Get all movie reviews
router.get('/', async (req, res) => {
   const movieReview = await movieReviewModel.find();
   res.status(200).json(movieReview);
});

/*
// Create Movie Review
router.post('/', async (req, res) => {
   console.log(req.body)
   await movieReviewModel(req.body).save();
   res.status(201).json({
       code: 201,
       msg: 'Successful created new review.',
   });
});
*/
export default router