import React, {useEffect, useState} from 'react';
import {onFavoriteTweet, onIsLiked} from '../../redux/tweet/tweet-reducer';
import {connect} from "react-redux";
import API from "../../api";
import UserLikesList from "./user-likes-list";

const FavoriteTweetButton = (props) => {
  const {handleFavoriteRequest, tweet, user} = props;
  const [isLiked, setIsLiked] = useState(undefined);
  const [list, setList] = useState([]);
  const [likedByListModalStatus, setLikedByListModalStatus] = useState(false);

  const onGetList = (tweet) => {
    API.get('/favorites', {params: {id: tweet.id}})
    .then((res) => {
      setList(res.data.favorites);
      //console.log(res.data.favorites);
    }).catch((error) => {
      alert("Cannot load likes")
      console.log(error)
    })
  }

  const handleLikedByListModalStatus = () => {
    if (likedByListModalStatus === true) {
      setLikedByListModalStatus(false);
    } else {
      setLikedByListModalStatus(true);
    }
  }

  useEffect(() => {
    onGetList(tweet);
  }, [isLiked])

  const handleIsLiked = (tweet, user) => {
    API.get("favorites/get_is_liked", {
      params: {
        tweetId: tweet.id,
        userId: user.id
      }
    }).then((res) => {
      let isLiked = res.data.favorite[0] ? true : false;
      setIsLiked(isLiked);
    }).catch((error) => {
      console.log(error);
    })
  }
  handleIsLiked(tweet, user);
  return <div className="p-2"><button className="btn btn-link text-danger like" onClick={() => {
        handleFavoriteRequest(tweet, user);
      }}>
      {isLiked ?
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
          <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
      }
    </button>
    <div className="btn btn-link text-danger like" onClick={() => {
      handleLikedByListModalStatus();
    }}>
    Likes: {list.length}
    <UserLikesList tweet={tweet} status={likedByListModalStatus} list={list} onClick={handleLikedByListModalStatus} />
  </div>
</div>
}

const mapDispatchToProps = (dispatch) => ({
  handleFavoriteRequest: (tweet, user) => {
    dispatch(onFavoriteTweet(tweet, user));
  }
})

export default connect(null, mapDispatchToProps)(FavoriteTweetButton);