require('dotenv').config();
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test'); // coonnect to local db
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yqhsb.mongodb.net/test`, {useNewUrlParser: true, useUnifiedTopology: true});
// connect to atlas

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


// Class.insertMany([
//   {
//     title: 'American History',
//     subject: 'History',
//     description: 'Learn about the history of America, from 1776 to now',
//   }, {
//     title: 'The Cold War',
//     subject: 'History',
//     description: 'Learn about the cold war and America\'s fight against communism',
//   }, {
//     title: 'English History',
//     subject: 'History',
//     description: 'Learn about the history of the UK and the English monarchs',
//   },
// ])
module.exports = {
  Class: Class,
  Student: Student,
};