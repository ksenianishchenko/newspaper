import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onGetUserFollowers } from "../../redux/user/user-reducer";

const Followers = (props) => {
  const { user, fetchUserFollowers, userFollowers } = props;
  const loadUserFollowers = () => {
    fetchUserFollowers(user) || [];
  }
  useEffect(() => {
    loadUserFollowers()
  }, [])

  return (
    <div>
      <h3 className="Followers">UserFollowers</h3>
      {
        userFollowers[0] != undefined ? userFollowers.map((follower, index) => (
          <p key={index}>{follower.handle}</p>
        )) : ''
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  userFollowers: state.user.userFollowers,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFollowers: (user) => dispatch(onGetUserFollowers(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);