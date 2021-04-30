import PropTypes from "prop-types";
import React, {useState} from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { connect } from "react-redux";
import {onCreateNewUser} from "../../redux/user/user-reducer";

const CreateUserForm = (props) => {

    const {handleSignUpRequest} = props;
    const [userValues, setUserValues] = useState({});

    const handleChange = (evt) => {
        const { target } = evt;
        const { name, value } = target;

        if (evt.target.checked) {
          setUserValues({ ...userValues, [name]: evt.target.checked });
        } else {
          setUserValues({ ...userValues, [name]: value });
        }
        
    };
    
    const handleSignup = (evt) => {
        evt.preventDefault();
        if (userValues.password.length < 6) {
          alert("Password should be at least 6 characters");
        } else {
          handleSignUpRequest(userValues);
        }
    }

    return <form method="" action="" className="create-user-form p-3">
        <h2 className="h4 mb-4">Add new user</h2>
        <FormInput
        id="email"
        name="email"
        className="form-control mb-4"
        placeholder="Email"
        handleChange={handleChange}
        />
        <FormInput
          id="firstname"
          name="firstname"
          className="form-control mb-4"
          placeholder="Firstname"
          handleChange={handleChange}
        />
        <FormInput
          id="lastname"
          name="lastname"
          className="form-control mb-4"
          placeholder="Lastname"
          handleChange={handleChange}
        />
        <FormInput
        id="handle"
        name="handle"
        className="form-control mb-4"
        placeholder="Username"
        handleChange={handleChange}
        />
        <FormInput
        id="password"
        name="password"
        className="form-control mb-4"
        placeholder="Password"
        handleChange={handleChange}
        />
        <FormInput
        id="confirm_password"
        name="password"
        className="form-control mb-4"
        placeholder="Confirm password"
        handleChange={handleChange}
        />
        <div className="form-check text-muted">
          <input type="checkbox" className="form-check-input" id="is_admin" name="is_admin" onChange={handleChange}/>
          <label className="form-check-label" htmlFor="is_admin">Admin</label>
        </div>

        <Button
        type="submit"
        className="btn btn-primary btn-block my-4 waves-effect waves-light"
        onClick={handleSignup}
        > Submit </Button>
    </form>
}

CreateUserForm.propTypes = {
  handleSignUpRequest: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
    handleSignUpRequest: (userValues) => {
        dispatch(onCreateNewUser(userValues));
    }
})

export default connect(null, mapDispatchToProps)(CreateUserForm);