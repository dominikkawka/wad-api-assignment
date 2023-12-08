import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieReviewSchema = new Schema({
   movieId: {type: String, required: true, unique: true},
   results: [{
      reviewId: {type: Number, required: true, unique: true},
      author: {type: String},
      content: {type: String},
      rating: {type: String},
   }]
})

MovieReviewSchema.statics.findByMovieDBId = function (id) {
   return this.findOne({ movieId: id });
 };
 
 export default mongoose.model('MovieReviews', MovieReviewSchema);