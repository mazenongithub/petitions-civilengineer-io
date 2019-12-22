import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './components/svg/svg.css';
import Register from './components/register';
import Petitions from './components/petitions';
import ViewPetitions from './components/viewpetitions';
import ShowPetition from './components/showpetition';
import Landing from './components/landing'
import Header from './components/header';
import Profile from './components/profile';
import * as actions from './components/actions';
import { LoadAllUsers } from './components/actions/api';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './components/firebase';
import { MyUser } from './components/functions';



class App extends Component {
  componentDidMount() {

    firebase.initializeApp(firebaseConfig);

    this.checkuser();

  }
  async checkuser() {
    try {
      //let myuser = await CheckUserLogin();
      let myuser = MyUser()
      console.log(myuser)
      if (myuser.hasOwnProperty("myuser")) {
        this.props.reduxUser(myuser.myuser)
        if (myuser.myuser.hasOwnProperty("allusers")) {
          this.props.reduxAllUsers(myuser.myuser.allusers)
        }
      } else {
        this.props.reduxUser(myuser)
        let response = await LoadAllUsers();
        console.log(response)
        if (response.hasOwnProperty("allusers")) {
          this.props.reduxAllUsers(response.allusers)
        }

      }
    } catch (err) {
      alert(err)
    }

  }
  render() {
    return (
      <BrowserRouter>
        <div className="general-container">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/users/register" component={Register} />
            <Route exact path="/users/viewpetitions" component={ViewPetitions} />
            <Route exact path="/petitions/:petitionid" component={ShowPetition} />
            <Route exact path="/:userid/petitions" component={Petitions} />
            <Route exact path="/:userid/profile" component={Profile} />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    allusers: state.allusers
  }
}

export default connect(mapStateToProps, actions)(App);
