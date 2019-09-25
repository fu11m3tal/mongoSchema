const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var UserSchema = new Schema({
  _id: Number,
  username: String,
  user_initials: String,
  user_initials_background: String,
  user_location: String,
  user_vip: Boolean,
  user_total_reviews: Number
})
const User = mongoose.model('users', UserSchema);

var ReviewSchema = new Schema({
  _id: Number,
  review: String, 
  overall: Number,
  food: Number,
  service: Number,
  ambience: Number,
  value: Number,
  noise: String,
  would_recommend: Number,
  date: Date, 
  restaurant_name: String,
  restaurant_id: Number,
  user_id: Number,
  user: String,
  user_initials: String,
  initials_background: String,
  location: String,
  vip: Number,
  total_reviews: Number
});

const Review = mongoose.model('reviews', ReviewSchema);

var RestaurantsSchema = new Schema({
  _id: Number,
  name: String,
  reviews: Object
});
const Restaurant = mongoose.model('restaurants', RestaurantsSchema);


module.exports = { Review, Restaurant, User }