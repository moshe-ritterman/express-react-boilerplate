import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from "./components/Loader";
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
    }
  }

  componentDidMount() {
    this.updateUserState();
  }

  updateUserState = async () => {
    if (!this.isLoggedin()) {
      const { data } = await axios.get('/loggedinUser');

      const newState = { loading: false };
      if (data.name && data.email) {
        newState.user = data;
      }

      this.setState(newState);
    }
  }

  isLoggedin = () => Object.entries(this.state.user).length > 0;

  routes = () => {
    let routes = <Loader />;
    const loginRoute = <Route path="/login" render={props => <Login updateUserState={this.updateUserState} {...props}></Login>}></Route>;
    if (!this.state.loading && this.isLoggedin()) {
      // Insert routes here
      routes = (<div>
        <Route exact path="/" component={Home}></Route>
        {loginRoute}
      </div>);
    } else if (!this.state.loading) {
      routes = (<div>
        {loginRoute}
        <Redirect to="/login" />
      </div>);
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

export default App;
