import React, {useState, useEffect} from "react";
import API from "../../api";
import { Link } from "react-router-dom";

import "./comments-list.scss";

const CommentsList = (props) => {

  const {tweet, currentUser} = props;

  const [newComment, setNewComment] = useState("");
  const [tweetComments, setTweetComments] = useState([]); // comments for a tweet
  const [tweetIdToUpdate, setTweetIdToUpdate] = useState(""); // for tracking tweet to update
  const [isAddCommentForm, setIsAddCommentForm] = useState(false); // show and hide form for add comment

  const handleChange = (evt) => {
    const { target } = evt;
    setNewComment(target.value);
  }

  const onLoadComments = (tweet_id) => {
    API.get(`tweet/${tweet_id}/comments`)
    .then((res) => {
      if (res) {
        setTweetComments(res.data);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const onAddComment = (text) => {
    API.post("tweet/comment", {comment: {
      author: currentUser.handle,
      comment: text,
      author_id: currentUser.id
    },
    tweet_id: tweet.id})
    .then((res) => {
      setIsAddCommentForm(false);
      setTweetComments(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const onDeleteComment = (tweet) => {
    API.delete("tweet/comment", {data: {tweet_id: tweet.tweet_id}})
    .then((res) => {
      if(res) {
        setTweetIdToUpdate(res.data.comment.tweet_id);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const onAddCommentForm = () => {
    if(isAddCommentForm === false) {
      setIsAddCommentForm(true);
    } else {
      setIsAddCommentForm(false);
    }
  }

  useEffect(() => {
    onLoadComments(tweet.id);
  }, [tweet])

  // update tweet when delete comment
  useEffect(() => {
    if(tweetIdToUpdate !== "") {
      onLoadComments(tweetIdToUpdate);
    }
  }, [tweetIdToUpdate])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (newComment.length > 0) {
      onAddComment(newComment);
    }
  }

  return <div className="panel panel-default widget text-left">
    <div className="panel-heading">
      <h5 className="panel-title">
        Comments: <span>{tweetComments.length}</span>
      </h5>
      <button type="button" className="btn btn-link" title="Delete" onClick={onAddCommentForm}>
        { isAddCommentForm ? <span>Hide form</span> : <span>Add comment</span>
        }
      </button>
    </div>
    {
      isAddCommentForm ? <form className="comment-form">
      <div className="form-group">
        <textarea name="comment border border-primary" className="form-control" rows="2" onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-outline-primary btn-sm" onClick={(e) => handleSubmit(e)}>Send</button>
    </form> : ""
    }
    
    <div className="panel-body">
      <ul className="list-group">
        {
          tweetComments.length ? tweetComments.map((item, index) => {
            return <li className="list-group-item" key={index}>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col"><div className="mic-info">
                    By: <Link to={`/profile/${item.author_id}`}>{item.author}</Link> on {item.created_at.slice(0, 10)}
                  </div>
                  </div>
                  <div className="col text-right">
                    {
                      currentUser.handle === item.author ? <button type="button" className="btn btn-link text-danger" title="Delete" onClick={() => {
                        onDeleteComment(item);
                      }}>Delete
                      </button> : ""
                    }
                    
                  </div>
                </div>
                <div className="comment-text">
                    {item.comment}
                </div>
              </div>
            </div>
          </li>
          } ) : ""
        }
      </ul>
    </div>
  </div>
}

export default CommentsList;