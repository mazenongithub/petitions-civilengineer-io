import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as actions from './components/actions'
import { connect } from 'react-redux';
import Register from './components/register';
import MyPetitions from './components/mypetitions';
import Petitions from './components/petitions';
import AllPetitions from './components/allpetitions';
import ViewPetitions from './components/viewpetitions';
import Profile from './components/profile';
import ViewProfile from './components/viewprofile'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  render() {
    return (
      <BrowserRouter>

        <Route exact path="/" component={landing} />
        <Route exact path="/:userid" component={ViewProfile} />
        <Route exact path="/users/register" component={Register} />
        <Route exact path="/:userid/petitions" component={Petitions} />
        <Route exact path="/:userid/profile" component={Profile} />
        <Route exact path="/petitions/view" component={AllPetitions} />
        <Route exact path="/petitions/view/:petitionid" component={ViewPetitions} />
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
