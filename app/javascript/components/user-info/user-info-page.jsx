import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const UserInfo = (props) => {
  const {currentUser, user, profileForAdmin} = props;
  return (
    <div className="row p-3">
      <div className="col">
        <Profile
          user={user}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);