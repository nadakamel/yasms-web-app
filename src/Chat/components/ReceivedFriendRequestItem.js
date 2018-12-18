import React, { Component } from "react";
import "../../App.css";
import { Alert, Button } from "reactstrap";

class ReceivedFriendRequestItem extends Component {
  constructor(props) {
    super(props);
  }

  onApprove() {
    this.props.onApprove(this.props.sender, this.props.receiver);
  }

  onDecline() {
    this.props.onDecline(this.props.sender, this.props.receiver);
  }

  render() {
    return (
      <div>
        <Alert color="warning">
          <p className="alert-heading">Received Friend Request</p>
          <h6>
            {this.props.sender}: {this.props.receiver} @ {this.props.time}
          </h6>
          <div style={{ width: "100%", marginTop: "10px" }}>
            <Button
              outline
              color="danger"
              style={{ width: "48%", marginRight: "10px" }}
              onClick={this.onDecline.bind(this)}
            >
              Decline
            </Button>
            <Button
              outline
              color="primary"
              style={{ width: "48%" }}
              onClick={this.onApprove.bind(this)}
            >
              Approve
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
}

/*
<div style={{display: "flex", flexDirection: "column", alignItems: "center", border: "solid 1px", padding: "10px", marginBottom: "5px", background: this.props.selected ? "aliceblue" : "white", justifyContent: "center", textAlign: "center"}}>
                {this.props.sender}: {this.props.receiver} @ {this.props.time}
                <div style={{width: "100%", marginTop: "10px"}}>
                    <button style={{width: "50%"}} onClick={this.onApprove.bind(this)}>Approve</button>
                    <button style={{width: "50%"}} onClick={this.onDecline.bind(this)}>Decline</button>
                </div>
            </div>
*/

export default ReceivedFriendRequestItem;
