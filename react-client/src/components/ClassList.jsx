import React from 'react';
import Class from './Class.jsx';

const ClassList = (props) => (
  <div>
    {props.subject} has been selected
    {props.classes.map((class) => {
    if (class.subject === this.props.subject){
      return(<Class class={class}/>);
    }
    }}
  </div>
)

export default ClassList;