import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import ClassList from './components/ClassList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: 'All',
      classes: [],
      subjectChoices: ['All', 'Math', 'Computer Science', 'History', 'English'],
    }
    this.changeSubject = this.changeSubject.bind(this);
  }

  componentDidMount() {
    let url = 'http://localhost:3000/';
    if (this.state.subject === 'All'){
      url += 'allClasses'
    } else {
      url += `${this.state.subject}`;
    }
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          classes: data,
        });
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  changeSubject() {
    var e = document.getElementById("subjectChoice");
    var strUser = e.options[e.selectedIndex].value;
    this.setState({
      subject: strUser,
    });
  }

  render () {
    return (
    <div id='mainWrapper'>
      <h1>Classes</h1>
      <select name="subjects" id="subjectChoice" onChange={this.changeSubject}>
        <option value="All">All Subjects</option>
        <option value="Math">Math</option>
        <option value="Computer Science">Computer Science</option>
        <option value="History">History</option>
        <option value="English">English</option>
      </select>
      <ClassList subject={this.state.subject} classes={this.state.classes} />
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));