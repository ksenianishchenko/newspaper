import React from "react";
import Button from "../button/button";
import { connect } from "react-redux";
import { getLikedByList, onGetLikedByList } from "../../redux/tweet/tweet-reducer";
import { Link } from "react-router-dom";

const UserLikesList = (props) => {
  const {
    tweet,
    status,
    list,
    handleClick
  } = props;

  return <div> { list && list.length > 0 ?
    <div className={status === true ? `modal-open` : `modal-close`}>
      <div className="modal bgr-dark" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Likes</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                { list.map((user, index) => {
                    return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                      <Link to={`/profile/${user[0]}`}
                      className="btn btn-link">{user[1]}</Link>
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    : "" }
  </div>
}

export default UserLikesList;