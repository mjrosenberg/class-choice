import React, { useState } from 'react';

const Class = (props) => {
  const [numStudents, setStudents] = useState(props.class.students.length);
  // const [student, setStudent] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  // })
  const url = `http://localhost:3000/addStudent/${props.class._id}`;
  const enroll = (e) => {
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
    //should also post the class up to the student's class list
  }
  return (
  <div className="classComponent">
    <div className="classTitle">Title: {props.class.title}</div>
    <div className="classDescription">Description: {props.class.description}</div>
    <div className="classStudentNum">Number of Students Enrolled: {numStudents}</div>
    {/* the length doesn't update on enroll  */}
    {/* need to insert inputs for firstname, lastname, and email that appear on hover */}
    {/* other option would be to have students create an account and then they can just press enroll and have their account info get added to the class's syudents array */}
    <button className="enroll" onClick={enroll}>Enroll in this Course</button>
  </div>);
}

export default Class;