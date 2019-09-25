const mongoose = require('mongoose');
const {Review, Restaurant, User} = require('./schema');
var myDB = 'mongodb://localhost/reviewsDB';

mongoose.connect(myDB, {useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

exports.getAllReviews = (req, res) => {
  var { restaurant_id } = req.params
  console.log({ restaurant_id })
  Review.find({ restaurant_id })
  .then(data => {
    res.send(data)
    console.log(`Successful get all reviews for restaurant_id: ${restaurant_id}`)
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getReview = (req, res) => {
  var { _id } = req.params
  console.log(_id)
  Review.find({_id})
  .then(data => {
    res.send(data)
    console.log(`Successful get review for id: ${_id}`)
  })
  .catch(err => {
    console.log(err)
  })
}

exports.postReview = (req, res) => {
  var { restaurant_id } = req.params
  var { review, overall, food, service, ambience, value, noise, would_recommend, date, user_id, user, user_initials, initials_background, location, vip, total_reviews } = req.body

  Review.countDocuments()
  .then(count => {
    var newReview = {
      _id: count,
      review: review, 
      overall: overall,
      food: food,
      service: service,
      ambience: ambience,
      value: value,
      noise: noise,
      would_recommend: would_recommend,
      date: date, 
      restaurant_id: restaurant_id,
      user_id: user_id,
      user_name: user,
      user_initials: user_initials,
      initials_background: initials_background,
      location: location,
      vip: vip,
      total_reviews: total_reviews
    }
    const newReviewInstance = new Review (newReview);
    newReviewInstance.save()
    .then(data => {
      console.log("Successful Post: ")
      res.send(data)
      // res.sendStatus(201)
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err)
  })
}

exports.updateReview = (req, res) => {
  Review.updateOne({id: changes.id}, {$set: changes}, {new:true})
  .then((data) => {
    res.send(data.id)
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.deleteReview = (req, res) => {
  var { _id } = req.params
  Review.deleteOne({ _id })
  .then(data => {
    if(data.deletedCount === 1) {
      res.send(_id)
    } else {
      res.sendStatus(404)
    } 
  })
  .catch((err) => {
    console.log(err)
  })
}

////////////////////////////////////////
/////////////RESTAURANTS////////////////
////////////////////////////////////////

// exports.getAllReviews = (req, res) => {
//   var { _id } = req.params
//   Restaurant.find({_id})
//   .then(data => {
//     var thing = JSON.parse(data[0].reviews[0])
//     res.send(thing)
//     console.log(`Successful get all reviews for id: ${_id}`)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }

// exports.getReview = (req, res) => {
//   var { _id } = req.params
//   Restaurant.find({ _id})
//   .then(data => {
//     res.send(data)
//     console.log(`Successful get review for id: ${_id}`)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }

// exports.postReview = (req, res) => {
//   const newReview = new Review ({});
//   newReview.save()
//   .then(data => {
//     res.send(data.id)
//     // res.sendStatus(201)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }

// exports.updateReview = (req, res) => {
//   Restaurant.updateOne({_id:1}, {$set: changes}, {new:true})
//   .then((data) => {
//     res.send(data.id)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// }

// exports.deleteReview = (req, res) => {
//   Restaurant.deleteOne(req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.sendStatus(204);
//     }
//   });
// }