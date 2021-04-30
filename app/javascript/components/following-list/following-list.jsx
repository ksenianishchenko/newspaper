import React, { useEffect, useState, useRef} from "react";
import Button from "../button/button";
import { connect } from "react-redux";
import { onNewRelationship, onDeleteRelationship } from "../../redux/relationship/relationship-reducer";
import { Link } from "react-router-dom";

const FollowingList = (props) => {
  const {
    handleClick,
    status,
    list,
    currentUser,
    onDeleteExistRelationship,
    updateFollowInfo
  } = props;

  // Hook
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const [isUpdated, setIsUpdated] = useState(false);

  const prevList = usePrevious(list);

  const unfollowUser = (followed) => {
    onDeleteExistRelationship(currentUser, followed);
    //window.location.reload();
    setIsUpdated(true);
  }

  useEffect(() => {
    if (isUpdated === true) {
      updateFollowInfo();
    } else {
      setIsUpdated(false);
    }
  }, [isUpdated, prevList]);

  return <div className={status === true ? `modal-open` : `modal-close`}>
    <div className="modal bgr-dark" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Following</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <ul className="list-group">
            { list ? list.map((user, index) => {
                  return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                    <Link to={`/profile/${user.id}`} className="btn btn-link">{user.handle}</Link>

                    <div className="btn-group-vertical">
                      <Button type="button" className="btn btn-outline-dark" onClick={() => unfollowUser(user)}>
                        Unfollow
                      </Button>
                    </div>
                  </li>
              } ) : ""
            }
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
}

const mapDispatchToProps = (dispatch) => ({
  onCreateNewRelationship: (user, currentUser) => {
    dispatch(onNewRelationship(user, currentUser));
  },
  onDeleteExistRelationship: (user, currentUser) => {
    dispatch(onDeleteRelationship(user, currentUser));
  },
})

export default connect(null, mapDispatchToProps)(FollowingList);