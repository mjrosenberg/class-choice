var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('mongoose connection error', err);
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const subjects = ['Math', 'Computer Science', 'History', 'English'];
var classSchema = mongoose.Schema({
  title: {type: String, unique: true, required: true},
  subject: {type: String, index: true, enum: subjects, required: true},
  description: {type: String, required: true},
  students: { type: Array, default: [] }
});

var Class = mongoose.model('Class', classSchema);

var selectAll = function(callback) {
  Class.find({}, function(err, classes) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, classes);
    }
  });
};
// Class.insertMany([
//   {title: 'Javascript Fundamentals',
//   subject: 'Computer Science',
//   description: 'Let\'s learn the basics of javascript'},
//   {title: 'React and Express',
//   subject: 'Computer Science',
//   description: 'Learn basics of full stack development'},
//   {title: 'Java Fundamentals',
//   subject: 'Computer Science',
//   description: 'Let\'s learn the basics of java'},
//   {title: 'Design and Analysis oof Algorithms',
//   subject: 'Computer Science',
//   description: 'Design and analyze coomplex algorithms through proof-based learning'},
// ],
// (err)=> {
//   console.log(err);
// });

module.exports.Class = Class;