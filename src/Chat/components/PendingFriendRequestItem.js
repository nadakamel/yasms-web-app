import React, { Component } from "react";
import "../../App.css";
import { Alert } from "reactstrap";

class PendingFriendRequestItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Alert color="info">
          <p className="alert-heading">Pending Friend Request</p>
          <h6>
            {this.props.sender}: {this.props.receiver} @ {this.props.time}
          </h6>
        </Alert>
      </div>
    );
  }
}

export default PendingFriendRequestItem;
