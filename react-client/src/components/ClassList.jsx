import React from 'react';
import Class from './Class.jsx';

const ClassList = (props) => (

  <div>
    {props.subject} has been selected
    {props.classes.map((item) => {
      console.log('item is', item);
        if (item.subject === props.subject || props.subject === 'All') {
          console.log(item.subject, 'matches subject', props.subject)
          return(<Class class={item} key={item._id} />);
        }
        // return (<div></div>)
      })
    }
  </div>
);

export default ClassList;