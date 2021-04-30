import React, {useState, useEffect} from 'react';
import {onNewTweet} from '../../redux/tweet/tweet-reducer';
import {connect} from "react-redux";
import TweetInput from '../tweet-input/tweet-input';
import {setNewTweetPopup} from "../../redux/tweet/tweet-actions";

const SubmitNewTweet  = (props) => {
  const {handleNewTweet, currentUser, handleNewTweetPopup, newTweetPopup} = props;
  const [newTweet, setNewTweet] = useState({});
  const [charCount, setCharCount] = useState(0);

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setNewTweet({ [name]: value, user: currentUser });
    setCharCount(target.value.length);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // only submit a tweet with text
    if (newTweet.newTweet.length > 0) {
      handleNewTweet(newTweet);
    }
  }

  const handlePopup = () => {
    handleNewTweetPopup(false);
  }

  return <div className={newTweetPopup === true ? `modal-open` : `modal-close`}>
    <form method="" action="">
    <div className="modal no-fixed" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post New Tweet</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handlePopup}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <TweetInput
              required
              id="newTweet"
              name="newTweet"
              className="form-control mb-4 profile-content"
              placeholder="What's on your mind?"
              handleChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <div className="text-left mt-1" id="counter">{charCount} / 140 </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send Tweet</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handlePopup}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </form>
  </div>
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  newTweetPopup: state.tweet.newTweetPopup
})

const mapDispatchToProps = (dispatch) => ({
  handleNewTweet: (newTweet) => dispatch(onNewTweet(newTweet)),
  handleNewTweetPopup: (status) => dispatch(setNewTweetPopup(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitNewTweet);
