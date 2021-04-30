import tweetTypes from './tweet-types';
import { deleteTweet, favoriteTweet } from './tweet-actions';
import API from '../../api';
import { onGetUserFeed } from "../user/user-reducer";

const INITIAL_STATE = {
  newTweet: null,
  userFeed: null,
  newTweetPopup: false,
  favoriteTweet: null,
  likedByList: null
}

const onNewTweet = (newTweet) => {
  return (dispatch, getState) => {
    API.post("tweets", newTweet)
    .then((res) => {
      if (res) {
        dispatch(onGetUserFeed(getState().user.currentUser));
      }
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onRetweet = (tweet, currentUser) => {
  return (dispatch, getState) => {
    API.post("tweets/retweet", {currentUser: currentUser, tweet: tweet})
    .then((res) => {
      if (res) {
        dispatch(onGetUserFeed(getState().user.currentUser));
      }
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onDeleteTweet = (tweetId) => {
  return (dispatch, getState) => {
    API.delete("tweets", {data: {id: tweetId}})
    .then((res) => {
      dispatch(deleteTweet(res));
      if (res) {
        dispatch(onGetUserFeed(getState().user.currentUser));
      }
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onFavoriteTweet = (tweet, user) => {
  return (dispatch, getState) => {
    API.get("favorites/get_is_liked", {
      params: {
        tweetId: tweet.id,
        userId: user.id
      }
    }).then((res) => {
      if (res.data.favorite[0]) {
        // 'unlike' tweet: delete favorite for tweet/user
        API.delete("favorites/unlike", {data: {id: res.data.favorite[0].id}})
        .then((res) => {
          dispatch(favoriteTweet(res));
          if (res) {
            dispatch(onGetUserFeed(getState().user.currentUser));
          }
        }).catch((error) => {
          console.log(error);
        })
      } else {
        // 'like' tweet: create new favorite for tweet/user
        API.post("favorites/like", {tweet, user})
        .then((res) => {
          dispatch(favoriteTweet(res));
          if (res) {
            dispatch(onGetUserFeed(getState().user.currentUser));
          }
        }).catch((error) => {
          console.log(error);
          alert(error);
        })
      }
    }).catch((error) => {
      console.log(error)
      alert(error);
    })
  }
}

const onGetLikedByList = (tweet) => {
  return (dispatch, getState) => {
    API.get('/favorites/get_favorites_for_tweet', {params: {tweetId: tweet.id,}})
    .then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}


const tweetReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case tweetTypes.POST_NEW_TWEET:
      return {
        ...state,
        newTweet: action.payload
      }
    case tweetTypes.DELETE_TWEET:
      return {
        ...state,
        deleteTweet: action.payload
      }
    case tweetTypes.SET_NEW_TWEET_POPUP_STATUS:
      return {
        ...state,
        newTweetPopup: action.payload
      }
    case tweetTypes.FAVORITE_TWEET:
      return {
        ...state,
        favoriteTweet: action.payload
      }
    case tweetTypes.GET_LIKED_BY_LIST:
      return {
        ...state,
        likedByList: action.payload
      }
    case tweetTypes.RETWEET:
      return {
        ...state,
        retweet: action.payload
      }
    default:
      return state;
  }
}

export {
  tweetReducer,
  onNewTweet,
  onDeleteTweet,
  onFavoriteTweet,
  onGetLikedByList,
  onRetweet
};