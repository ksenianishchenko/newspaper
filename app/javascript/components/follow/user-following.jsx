import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onGetUserFollowing } from "../../redux/user/user-reducer";

const Following = (props) => {
  const { user, fetchUserFollowing, userFollowing } = props;
  const loadUserFollowing = () => {
    fetchUserFollowing(user) || [];
  }
  useEffect(() => {
    loadUserFollowing()
  }, [])

  return (
    <div>
      <h3 className="Following">UserFollowing</h3>
      {
        userFollowing[0] != undefined ? userFollowing.map((followed, index) => (
          <p key={index}>{followed.handle}</p>
        )) : ''
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  userFollowing: state.user.userFollowing,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFollowing: (user) => dispatch(onGetUserFollowing(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);