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

var studentSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, index: true, required: true, unique: true},
  password: {type: String, required: true},
  classes: { type: Array, default: [] }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = {
  Class: Class,
  Student: Student,
};