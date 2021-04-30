import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Button from "../button/button";
import UserLikesList from "./user-likes-list";
import { Link } from "react-router-dom";
import API from "../../api";

const Likes = (props) => {
  const {
    tweet,
    status,
  } = props;

  const [likedByListModalStatus, setLikedByListModalStatus] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

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
  }, [])

  return <div className="btn btn-link text-danger like" onClick={() => {
      handleLikedByListModalStatus();
    }}>
    Likes: {list.length}
    <UserLikesList tweet={tweet} status={likedByListModalStatus} list={list} onClick={handleLikedByListModalStatus} />
  </div>
}

export default Likes;