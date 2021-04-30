import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { onGetLikedByList } from '../../redux/tweet/tweet-reducer';
import { onGetUserFeed } from '../../redux/user/user-reducer';
import DeleteTweetButton from './delete-tweet-button';
import FavoriteTweetButton from './favorite-tweet-button';
import RetweetButton from './retweet-button';
import RetweetIcon from './retweet-icon';
import { Link } from "react-router-dom";
import CommentsList from "../comments-list/comments-list";
import API from "../../api";

const Feed = (props) => {
  const {currentUser, fetchUserFeed, userFeed, user} = props;
  const [retweets, setRetweets] = useState([]);

  const fetchUserRetweets = (currentUser) => {
    API.get('/tweets/retweet', {
      params: {user_id: currentUser.id}
    }).then((res) => {
      setRetweets(res.data);
      console.log(res.data);
    }).catch((error) => {
      alert("Cannot load user retweets");
      console.log(error);
    })
  }

  const isRetweeted = (currentTweet) => {
    let retweeted = {};
    retweets.forEach(tweet => {
      if (tweet.parent_id === currentTweet.id) {
        retweeted[currentTweet.id] = true;
      }
    })
    return retweeted;
  }

  const loadUserFeed = function () {
    // if we want feed of other user
    if (user) {
      fetchUserFeed(user);
    } else {
      fetchUserFeed(currentUser);
    }
  }

  useEffect(() => {
    loadUserFeed();
    fetchUserRetweets(currentUser);
  }, [user])

  return <div>
    {
      !userFeed  && !userFeed.length ? <p>Your feed will be here.</p> : <div>
        <h3>Latest Posts</h3>
        {
          userFeed[0] !=  undefined ? userFeed.map((tweet, index) => (
            <div key={index}>
              <div className="card">
                <div className="card-header card-title">
                  { tweet.parent_id &&
                    <RetweetIcon currentUser={currentUser}/>
                  }
                  <Link to={`/profile/${tweet.user_id}`}><strong>@{tweet.handle}</strong></Link>,  <small> {tweet.created_at.slice(0, 10)}</small>
                </div>
                <div className="card-body">
                  <p className="card-text">{tweet.body}</p>
                </div>
                <div className="card-footer text-muted text-right">
                  <div className="row">
                    <div className="col text-right d-flex justify-content-end">
                      { tweet.user_id !== currentUser.id &&
                        <RetweetButton tweet={tweet} currentUser={currentUser} isRetweeted={isRetweeted(tweet)}/>
                      }
                      <FavoriteTweetButton tweet={tweet} user={currentUser} />
                      {currentUser.id === tweet.user_id &&
                        <DeleteTweetButton tweet={tweet}/>
                      }
                    </div>

                  </div>
                  <CommentsList
                    tweet={tweet}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </div>
          )) : ''
        }
      </div>
    }
  </div>
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  userFeed: state.user.userFeed,
  isLoggedIn: state.user.logged_in,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFeed: (currentUser) => {
      dispatch(onGetUserFeed(currentUser));
    },
    handleGetLikedByList: (tweet) => {
      dispatch(onGetLikedByList(tweet));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);