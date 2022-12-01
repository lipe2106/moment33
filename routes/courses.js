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
mongoose.connect('mongodb://127.0.0.1:27017/moment33', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
  console.log("Connected to db");

  // Create db scheme
  var courseScheme = mongoose.Schema({
    courseId: String,
    courseName: String,
    coursePeriod: String
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

  /* Get specific course by id */
  router.get('/:id', function(req, res, next) {

    var id = req.params.id;

    Course.findById(id, function (err, course) {
      if (err) throw err;

      var jsonObj = JSON.stringify(course);
      res.contentType('application/json');
      res.send(jsonObj); 
    });

   
  });

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


  /* Add course */
  router.post('/', function(req, res, next) {

    // Create a new course
    var newCourse = new Course({ 
        courseId: req.body.courseId, 
        courseName: req.body.courseName,
        coursePeriod: req.body.coursePeriod
    });	
    console.log("test" + req.body.courseName);

    // Save new course to db
    newCourse.save(function(err) {
        if(err) return console.error(err);
    });

    var jsonObj = JSON.stringify(newCourse);
    res.contentType('application/json');
    res.send(jsonObj);

});

}); // DB connection
  
module.exports = router;
