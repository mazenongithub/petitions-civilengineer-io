import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as actions from './components/actions'
import { connect } from 'react-redux';
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel
  }
}

export default connect(mapStateToProps, actions)(App);
