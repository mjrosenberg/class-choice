import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import ClassList from './components/ClassList.jsx';
import hashPassword from '../../database-mongo/hashPassword.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: 'All',
      classes: [],
      subjectChoices: ['All', 'Math', 'Computer Science', 'History', 'English'],
      loggedIn: false,
      student: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        classes: [],
      },
      hasAccount: true,
      logInErr: '',
    }
    this.changeSubject = this.changeSubject.bind(this);
    this.signIn = this.signIn.bind(this);
    this.hasAccountChange = this.hasAccountChange.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }
  // if I press log out and log back in right now it rerenders the classes (and thus resets the num students count bc it hasn't been pulled from the database again)
  // componentDidUpdate(){
  //   if (loggedIn === false){
  //     this.getCourses();
  //   }
  // }
  getCourses(){
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

  signIn(e) {
    //hash inputted password and then fetch the account using the route defined on the server
    e.preventDefault();
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    // console.log('email is', email, 'password typed is', password);
    const hashedPassword = hashPassword(password);
    const url = `http://localhost:3000/login/${email}/${hashedPassword}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.error === undefined){
          this.setState({
            student: data,
            loggedIn: true,
          })
        } else {
          this.setState({
            logInErr: data.error,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  hasAccountChange(){
    this.setState({
      hasAccount: !this.state.hasAccount,
      logInErr: '',
    });
  }

  addAccount() {
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const data = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password
    }
    const url = 'http://localhost:3000/addAccount'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((data)=>{
        console.log('in the then');
        this.setState({
          student: {
            firstName: fname,
            lastName: lname,
            email: email,
            classes: [],
          },
          loggedIn: true,
          hasAccount: true,
          logInErr: '',
        })
      })
      .catch((err)=>{
        console.log('in the catch');

        this.setState({
          logInErr: 'Could Not Create Account',
        })
      })
  }

  signOut(){
    this.setState({
      loggedIn: false,
      student: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        classes: [],
      },
      subject: 'All',
    })
  }

  render () {
    if (this.state.loggedIn === false){
      if (this.state.hasAccount){
        return (
          <div id='signIn'>
            Sign into Account
            <form id='logInForm'>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email"/><br></br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password"/><br></br>
            </form>
            <button value="Submit" onClick={this.signIn}>Sign In</button><br></br>
            <button id='noAccount' onClick={this.hasAccountChange}>Don't Have An Account?</button>
            <div id='logInErr'>{this.state.logInErr}</div>
          </div>
          );
      } else {
          return (
          <div id='createAccount'>
            Create Account
            <form id='logInForm'>
            <label for="fname">First Name:</label>
              <input type="text" id="fname" name="fname"/><br></br>
              <label for="lname">Last Name:</label>
              <input type="text" id="lname" name="lname"/><br></br>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email"/><br></br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password"/><br></br>
            </form>
            <button value="Submit" onClick={this.addAccount}>Sign Up</button><br></br>
            <button id='alreadyAccount' onClick={this.hasAccountChange}>Already Have An Account?</button>
            <div id='logInErr'>{this.state.logInErr}</div>
          </div>);
      }
    } else {
      return (
      <div id='mainWrapper'>
        <h1 id='mainTitle'>{this.state.subject} Classes</h1>
        <div id='currStudent'>Signed in as: {this.state.student.email} </div>
        <div id='signoutWrapper'>
          <button id='signout' onClick={this.signOut}>Sign Out</button>
        </div>
        <select name="subjects" id="subjectChoice" onChange={this.changeSubject}>
          <option value="All">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Computer Science">Computer Science</option>
          <option value="History">History</option>
          <option value="English">English</option>
        </select>
        <ClassList subject={this.state.subject} classes={this.state.classes} student={this.state.student} />
      </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));