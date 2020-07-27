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
          for (let i = 0; i < props.student.classes.length; i++){
            let course = props.student.classes[i];
            if (course === null){
              continue;
            }
            if (course === item._id){
              enrolled = true;
              enrolledText = 'Already Enrolled in this Course, Click to Unenroll';
              break;
            }
          }
          return(<Class class={item} student = {props.student} key={item._id} enrolled={enrolled} enrolledText={enrolledText} append={props.append} />);
        }
      })
    }
  </div>
);

export default ClassList;