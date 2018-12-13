import React, { Component } from "react";
import "../../App.css"

class PendingFriendRequestItem extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div style={{fontStyle: "italics"}}>
                {this.props.sender}: {this.props.receiver} @ {this.props.time}
            </div>
        )
    }
}

export default PendingFriendRequestItem;