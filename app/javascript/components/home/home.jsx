import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../header/header";
import Feed from "../tweet/feed";
import CurrentUserProfile from "../current-user-profile/current-user-profile";
import SubmitNewTweet from "../tweet/newTweet";
import Suggestions from "../suggestions/suggestions";

const Home = (props) => {
  const {currentUser, userFeed, profileBySearch} = props;

  if (!currentUser) {
    <Redirect to="/welcome" />
  }

  if (profileBySearch) {
    return <Redirect to={`profile/${profileBySearch.id}`} />
  }

  return <div className="home-page">
    <Header />
    <div className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-3 p-3">
            <CurrentUserProfile
              totalPosts={userFeed.length}
            />
          </div>
          <div className="col p-3">
            <SubmitNewTweet />
            <Feed user={currentUser}/>
          </div>
        </div>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isLoggedIn: state.user.logged_in,
  userFeed: state.user.userFeed,
  userFollowers: state.user.userFollowers,
  userFollowing: state.user.userFollowing,
  profileBySearch: state.user.profileBySearch
})

export default connect(mapStateToProps, null)(Home);
