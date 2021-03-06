import React, { useState } from 'react';

const Class = (props) => {
  console.log(props.class);
  const [numStudents, setStudents] = useState(props.class.students.length);
  const [enrolled, setEnrolled] = useState(props.enrolled);
  const [enrolledText, setEnrolledText] = useState(props.enrolledText);
  const url = `http://localhost:3000/addStudent/${props.class._id}`;
  const url2 = `http://localhost:3000/addClass/${props.student.email}`;
  const url3 = `http://localhost:3000/removeStudent/${props.class._id}`;
  const url4 = `http://localhost:3000/removeClass/${props.student.email}`;

  const enroll = (e) => {
    //also need to check to make sure that the student isn't already enrolled in the class before running the first fetch
    // try and remember the classes student's are already enrolled in and make them display a different text and be unclickable
    // check if the class already has the student in it
    // if (props.class.students.includes(props.student)){
    //   return;
    //   // maybe display a message like already enrolled in this course and make thhe buttoon unclickable
    // }
    props.append(props.class._id);
    if (enrolled === true){
      //add in the ability to unenroll on a click if already enrolled
      //delete the student from the class's students array
      fetch(url3, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(props.student),
      })
        .then((data) => {
          console.log('updated class', data);
          setStudents(numStudents - 1);
        })
        .catch((err) => {
          console.error(err);
        });
      //delete the class from the student's classes array
      fetch(url4, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({id: props.class._id}),
      })
        .then((data)=>{
          console.log('removed class')
        })
        .catch((err) => {
          console.error(err);
        });
      setEnrolled(false);
      setEnrolledText('Enroll in this Course');
      // maybe display a message like already enrolled in this course and make thhe buttoon unclickable
    } else {
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
        });

      fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({id: props.class._id}),
      })
        .then((data)=>{
          console.log('added class')
        })
        .catch((err) => {
          console.error(err);
        });
    //should also post the class up to the student's class list
      setEnrolled(true);
      setEnrolledText('Already Enrolled in this Course, Click to Unenroll');
    }
  }

  return (
  <div className="classComponent">
    <div className="classTitle">{props.class.title}</div>
    <div className="classSubject">{props.class.subject}</div>
    <div className="classDescription">Description: {props.class.description}</div>
    <div className="classStudentNum">Number of Students Enrolled: {numStudents}</div>
    <button className="enroll" onClick={enroll}>{enrolledText}</button>
  </div>);
}

export default Class;