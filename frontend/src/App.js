import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Loader from "./common/Loader";
import Home from './components/Home';
import Login from './components/Login';
import { getLoggedinUser } from './actions/user';

class App extends Component {
  componentDidMount() {
    this.props.getLoggedinUser();
  }

  isLoggedin = () => Object.entries(this.props.user).length > 0;

  routes = () => {
    let routes;
    const user = this.props.user;

    if (user === null) {
      routes = <Loader />;
    } else {
      const isLoggedin = Object.entries(this.props.user).length > 0;
      const loginRoute = <Route exact path="/login" component={Login}></Route>
      if (isLoggedin) {
        // Insert routes here
        routes = (<div>
          <Route exact path="/" component={Home}></Route>
          {loginRoute}
        </div>);
      } else {
        routes = (<div>
          {loginRoute}
          <Redirect to="/login" />
        </div>);
      }
    }

    return routes;
  }

  render() {
    return (
      <div className="container py-2">
        <Router>
          {this.routes()}
        </Router>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

const mapDispatchToProps = { getLoggedinUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
