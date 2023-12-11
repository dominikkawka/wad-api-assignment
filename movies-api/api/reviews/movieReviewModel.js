import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieReviewSchema = new Schema({
   movieId: {type: Number, required: true},
   reviewId: {type: Number, required: true, unique: true},
   author: {type: String},
   content: {type: String},
   rating: {type: String},
})

MovieReviewSchema.statics.findByReviewId = function (id) {
   return this.findOne({ reviewId: id });
 };

MovieReviewSchema.statics.removeByReviewId = function (id) {
   return this.deleteOne({ reviewId: id });
 };
 
MovieReviewSchema.statics.findByMovieId = function (id) {
  return this.find({ movieId: id });
};

 export default mongoose.model('MovieReviews', MovieReviewSchema);