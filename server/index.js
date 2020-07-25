var express = require('express');
var bodyParser = require('body-parser');
const Promise = require('bluebird');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var classes = require('../database-mongo');

var app = express();

app.use(bodyParser.json());
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

Promise.promisifyAll(require('mongoose'));

app.get('/classes/:subjectName', (req, res) => {
  classes.Class.find({'subject': req.params.subjectName})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.error(err);
    });
});

app.get('/allClasses', (req, res) => {
  classes.Class.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.error(err);
    });
});

app.post('/addStudent/:classId', (req, res) => {
  classes.Class.findOneAndUpdate({_id: req.params.classId}, {$push:{students: req.body}}, {
    new: true
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.error(err);
    });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

