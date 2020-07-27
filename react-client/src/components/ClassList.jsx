import React from 'react';
import Class from './Class.jsx';

const ClassList = (props) => (

  <div>
    {/* {props.subject} has been selected */}
    {props.classes.map((item) => {
      console.log('item is', item);
        if (item.subject === props.subject || props.subject === 'All') {
          // console.log(item.subject, 'matches subject', props.subject)
          let enrolled = false;
          let enrolledText = 'Enroll in this Course';
          // console.log('student classes', props.student.classes);
          // if (props.student.classes.includes(item._id)){
          //   enrolled = true;
          //   console.log(props.student.firstName, 'is already in class', item._id);
          //   // console.log('enrolled already in course', props.class.title);
          //   // maybe display a message like already enrolled in this course and make thhe buttoon unclickable
          // }
          for (let i = 0; i < props.student.classes.length; i++){
          // for (let course of props.student.classes){
            // console.log('i is', i);
            let course = props.student.classes[i];
            if (course === null){
              continue;
            }
            if (course === item._id){
              enrolled = true;
              enrolledText = 'Already Enrolled in this Course, Click to Unenroll';
              // console.log(props.student.firstName, 'is already in class', item._id);
              break;
            }
          }
          return(<Class class={item} student = {props.student} key={item._id} enrolled={enrolled} enrolledText={enrolledText}/>);
        }
        // return (<div></div>)
      })
    }
  </div>
);

export default ClassList;