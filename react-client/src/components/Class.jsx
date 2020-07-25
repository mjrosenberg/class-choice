import React, { useState } from 'react';

const Class = (props) => {
  const [numStudents, setStudents] = useState(props.class.students.length);
  // const [student, setStudent] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  // })
  const url = `http://localhost:3000/addStudent/${props.class._id}`;
  const url2 = `http://localhost:3000/addClass/${props.student._id}`;
  const enroll = (e) => {
    //also need to check to make sure that the student isn't already enrolled in the class before running the first fetch
    // try and remember the classes student's are already enrolled in and make them display a different text and be unclickable
    if (props.student.classes.includes(props.class._id)){
      return;
      // maybe display a message like already enrolled in this course and make thhe buttoon unclickable
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(props.student),
    })
      .then((data) => {
        console.log('updated class', data);
        setStudents(numStudents + 1);
      })
      .catch((err) => {
        console.error(err);
      })
    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(props.class._id),
    })
      .then((data)=>{
        console.log('added class')
      })
      .catch((err) => {
        console.error(err);
      });
    //should also post the class up to the student's class list
  }
  return (
  <div className="classComponent">
    <div className="classTitle">Title: {props.class.title}</div>
    <div className="classDescription">Description: {props.class.description}</div>
    <div className="classStudentNum">Number of Students Enrolled: {numStudents}</div>
    <button className="enroll" onClick={enroll}>Enroll in this Course</button>
  </div>);
}

export default Class;