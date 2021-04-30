import React from "react";
import Button from "../button/button";
import { connect } from "react-redux";
import { onNewRelationship, onDeleteRelationship } from "../../redux/relationship/relationship-reducer";

// need current user
// profile followers and profile following
// check if current user exist in profile following -> show Unfollow button
// check if current user dosn't exist in profile following -> show Follow button

const FollowButton = (props) => {
  const {
    currentUser,
    profileFollowers,
    handleFollow,
    handleUnfollow
  } = props;

  if (profileFollowers.length > 0) {
      return <div className="btn-group-vertical">
        <div className="col">
          {
            profileFollowers.filter(profile => profile.id === currentUser.id).length > 0 ? <Button type="button" className="btn btn-outline-primary" onClick={handleUnfollow}>
            Unfollow
          </Button> : <Button type="button" className="btn btn-outline-primary" onClick={handleFollow}>
            Follow
          </Button>
          }
        </div>
      </div>
  } else {
    return <div className="col">
    <div className="btn-group-vertical">
      <Button type="button" className="btn btn-outline-primary" onClick={handleFollow}>
        Follow
      </Button>
    </div>
  </div>
  }
}

const mapStateToProps = (state) => ({
  userFollowing: state.user.userFollowing,
  userFollowers: state.user.userFollowers
})

const mapDispatchToProps = (dispatch) => ({
  onCreateNewRelationship: (user, currentUser) => {
    dispatch(onNewRelationship(user, currentUser));
  },
  onDeleteExistRelationship: (user, currentUser) => {
    dispatch(onDeleteRelationship(user, currentUser));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)
