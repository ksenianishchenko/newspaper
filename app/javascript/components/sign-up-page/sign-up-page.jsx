import React, {useState} from "react";
import axios from 'axios-on-rails';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import {onSignUpRequest} from "../../redux/user/user-reducer";
// import {onNewRelationship} from "../../redux/relationship/relationship-reducer";

import "./sign-up-page.scss";

const SignUpPage = (props) => {

  const {handleSignUpRequest, isLoggedIn} = props;
  const [userValues, setUserValues] = useState({});

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleSignup = (evt) => {
    evt.preventDefault();

    if (userValues.password.length < 6) {
      alert("Password should be at least 6 characters");
    } else {
      handleSignUpRequest(userValues);
    }
    
  }

  if (isLoggedIn === true) {
    return (
      <Redirect to="/" />
    )
  }

  return <div className="sign-up-page">
    <div className="text-center border border-light p-5">
      <form method="" action="">
        <h2 className="h4 mb-4">Sign Up</h2>
        <FormInput
          id="email"
          name="email"
          className="form-control mb-4"
          placeholder="email"
          handleChange={handleChange}
        />
        <FormInput
          id="firstname"
          name="firstname"
          className="form-control mb-4"
          placeholder="First Name"
          handleChange={handleChange}
        />
        <FormInput
          id="lastname"
          name="lastname"
          className="form-control mb-4"
          placeholder="Last Name"
          handleChange={handleChange}
        />
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
          type="password"
          minLength={6}
        />
        <FormInput
          id="confirm_password"
          name="password"
          className="form-control mb-4"
          placeholder="confirm_password"
          handleChange={handleChange}
          type="password"
          minLength={6}
        />
        <Button
          type="submit"
          className="btn btn-primary btn-block my-4 waves-effect waves-light"
          onClick={handleSignup}
        > Submit </Button>
      </form>
      <p>Already have an account?
        <Link to="/login" className="btn btn-link">Login</Link>
      </p>
    </div>
  </div>

}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.logged_in
})

const mapDispatchToProps = (dispatch) => ({
  handleSignUpRequest: (userValues) => {
    dispatch(onSignUpRequest(userValues));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);