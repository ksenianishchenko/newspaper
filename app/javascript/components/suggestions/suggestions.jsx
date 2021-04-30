import React from "react";

const Suggestions = () => {

  return <div className="suggestions">
    <h3>Suggestions for you</h3>
    <div className="suggestions-list">
      <div className="card">
        <div className="card-body row">
          <div className="col">
            <p className="card-title">User Name</p>
            <p className="card-text"><small>User email</small></p>
          </div>
          <div className="col text-right">
            <a href="#" className="btn btn-primary">Follow</a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body row">
          <div className="col">
            <p className="card-title">User Name</p>
            <p className="card-text"><small>User email</small></p>
          </div>
          <div className="col text-right">
            <a href="#" className="btn btn-primary">Follow</a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body row">
          <div className="col">
            <p className="card-title">User Name</p>
            <p className="card-text"><small>User email</small></p>
          </div>
          <div className="col text-right">
            <a href="#" className="btn btn-primary">Follow</a>
          </div>
        </div>
      </div>
    </div>
  </div>

}

export default Suggestions;