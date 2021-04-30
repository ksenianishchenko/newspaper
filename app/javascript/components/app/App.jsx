import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../home/home";
import SignUpPage from "../sign-up-page/sign-up-page";
import SignInPage from "../sign-in-page/sign-in-page";
import Welcome from "../welcome/welcome";
import Dashboard from "../dashboard/dashboard";
import EditProfilePage from "../edit-profile-page/edit-profile-page";
import UserInfoPage from "../user-info/user-info-page";
import {onLoggedInRequest} from "../../redux/user/user-reducer";
import ProfilePage from "../profile-page/profile-page";

import "./app.scss";

const App = (props) => {
  const {isLoggedIn, handleLoggedIn, currentUser} = props;
  const [ loading, isLoading ] = useState(true);

  // It will be executed before rendering

  useEffect(() => {
    /*
      prevent login page from flashing on reload
      before currentUser has been loaded from props.
    */
    //setTimeout(() => isLoading(false), 1000);
    handleLoggedIn();

    if (isLoggedIn !== null) {
      isLoading(false);
    }
  }, [isLoggedIn]);

  return !loading ? <div className="main">
      <Router>
        <Switch>
          <Route exact path='/' render={() => currentUser ? <Home /> : <Welcome />}/>
          <Route exact path='/signup' component={SignUpPage} />
          <Route exact path='/login' component={SignInPage} />
          <Route exact path='/dashboard' render={() => currentUser ? <Dashboard /> : <Welcome />}/>
          <Route exact path='/profile/edit/:id' component={EditProfilePage}/>
          <Route exact path='/users/:id' component={UserInfoPage}/>
          <Route path='/profile/:profile_id' component={ProfilePage}/>
        </Switch>
      </Router>
  </div> : <div className="loader-block">
      <p>Loading...</p>
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.logged_in,
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  handleLoggedIn: () => {
    dispatch(onLoggedInRequest());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
