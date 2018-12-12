import React, { Component } from "react";
import "../../App.css"

class PendingFriendRequestItem extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div style={{fontStyle: "italics"}}>
                {this.props.title}
            </div>
        )
    }
}

export default PendingFriendRequestItem;