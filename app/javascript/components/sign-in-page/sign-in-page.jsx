import React, {useState} from "react";
import axios from 'axios-on-rails';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import Error from "../error/error";
import {onLoginRequest} from "../../redux/user/user-reducer";

import "./sign-in-page.scss";

const SignInPage = (props) => {

  const {handleLoginRequest, isLoggedIn, logginError} = props;

  const [userValues, setUserValues] = useState({});

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleSignin = (evt) => {
    evt.preventDefault();
    handleLoginRequest(userValues);
  }

  if (isLoggedIn === true) {
    return (
      <Redirect to="/" />
    )
  }

  return <div className="sign-in-page">
    <div className="text-center border border-light p-5">

      <form method="" action="" >
        <h2 className="h4 mb-4">Login</h2>
        <FormInput
          id="handle"
          name="handle"
          className="form-control mb-4"
          placeholder="user_handle"
          handleChange={handleChange}
        />
        <FormInput
          id="password"
          name="password"
          className="form-control mb-4"
          placeholder="password"
          handleChange={handleChange}
        />
        <Button
          type="submit"
          className="btn btn-primary btn-block my-4 waves-effect waves-light"
          onClick={handleSignin}
        > Submit </Button>
      </form>
      {logginError && <Error>Wrong login or password</Error>}
      <p>Don't have an account?
        <Link to="/signup" className="btn btn-link">Register</Link>
      </p>
    </div>
  </div>

}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.logged_in,
  logginError: state.user.loggin_error
})

const mapDispatchToProps = (dispatch) => ({
  handleLoginRequest: (userValues) => {
    dispatch(onLoginRequest(userValues));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
