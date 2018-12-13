import React, { Component } from "react";
import "../../App.css"

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
        return(
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", border: "solid 1px", padding: "10px", marginBottom: "5px", background: this.props.selected ? "aliceblue" : "white", justifyContent: "center", textAlign: "center"}}>
                {this.props.sender}: {this.props.receiver} @ {this.props.time}
                <div style={{width: "100%", marginTop: "10px"}}>
                    <button style={{width: "50%"}} onClick={this.onApprove.bind(this)}>Approve</button>
                    <button style={{width: "50%"}} onClick={this.onDecline.bind(this)}>Decline</button>
                </div>
            </div>
        )
    }
}

export default ReceivedFriendRequestItem;