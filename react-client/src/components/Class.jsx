import React, { useState } from 'react';

const Class = (props) => {
  const [state, setState] = useState({
    length: props.class.students.length,
    firstName: '',
    lastName: '',
    email: '',
  })
  const url = `http://localhost:3000/addStudent/${props.class._id}`;
  const enroll = (e) => {
    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
    }
    // data should come from user inputs
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
    .then((data) => {
      console.log('updated class', data);
      // setState({
      //   // return ({
      //     // update the state using hooks somehow
      //     ...state,
      //     length: state.length + 1
      //   });
      // });
    })
    .catch((err) => {
      console.error(err);
    })
  }
  return (
  <div className="classComponent">
    <div className="classTitle">Title: {props.class.title}</div>
    <div className="classDescription">Description: {props.class.description}</div>
    <div className="classStudentNum">Number of Students Enrolled: {state.length}</div>
    {/* the length doesn't update on enroll  */}
    {/* need to insert inputs for firstname, lastname, and email that appear on hover */}
    {/* other option would be to have students create an account and then they can just press enroll and have their account info get added to the class's syudents array */}
    <button className="enroll" onClick={enroll}>Enroll in this Course</button>
  </div>);
}

export default Class;