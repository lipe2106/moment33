// Av Lina Petersson

var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json());

// Database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myCV', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
  console.log("Connected to db");

  // Create db scheme
  var courseScheme = mongoose.Schema({
    code: String,
    name: String,
    syllabus: String,
    progression: String,
    term: String
  });

  // Create scheme model
  var Course = mongoose.model('Course', courseScheme)


  /* GET courses */
  router.get('/', function(req, res, next) {

    // Get courses from database
    Course.find(function(err, courses) {
      if(err) return console.error(err);
      var jsonObj = JSON.stringify(courses);
      res.contentType('application/json');
      res.send(jsonObj);
    });
  });

  /* Get specific course by id
  router.get('/:id', function(req, res, next) {

    var id = req.params.id;
    var ind = -1;

    // Find the array index that holds _id = id
    for(var i=0; i < courses.length; i++) {
      if(courses[i]._id == id) {
        ind = i; 
      }
    }

    res.contentType('application/json');
    res.send(ind>=0?courses[ind]:"Kursen kunde inte hittas"); // If course is found return course object else error message
  });*/

  /* Delete specific course */
  router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    // Delete course with _id from db
    Course.deleteOne({ "_id": id }, function (err) {
      if (err) return handleError(err);
    });

    // Get new course list as response
    Course.find(function(err, courses) {
      if(err) return console.error(err);
  
      var jsonObj = JSON.stringify(courses);
      res.contentType('application/json');
      res.send(jsonObj);
    });
  });

}); // DB connection
  
module.exports = router;
