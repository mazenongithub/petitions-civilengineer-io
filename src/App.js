import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import './components/svg/svg.css';
import Register from './components/register';
import Petitions from './components/petitions';
import * as actions from './components/actions';
import { CheckUserLogin } from './components/actions/api';
import firebase from 'firebase'
import { firebaseConfig } from './components/firebase';

const landing = () => {
  return (<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
</a>
    </header>
  </div>)
}

class App extends Component {
  componentDidMount() {

    firebase.initializeApp(firebaseConfig);

    this.checkuser();

  }
  async checkuser() {
    try {
      let myuser = await CheckUserLogin();
      console.log(myuser)
      if (myuser.hasOwnProperty("myuser")) {
        this.props.reduxUser(myuser.myuser)
      }

    } catch (err) {
      alert(err)
    }

  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={landing} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/:userid/petitions" component={Petitions} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel
  }
}

export default connect(mapStateToProps, actions)(App);
