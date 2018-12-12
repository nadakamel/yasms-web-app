import React, { Component } from "react";
import "../../App.css"

class ReceivedFriendRequestItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{height: "85px", display: "flex", flexDirection: "column", alignItems: "center", border: "solid 1px", padding: "10px", marginBottom: "5px", background: this.props.selected ? "aliceblue" : "white", justifyContent: "center"}}>
                {this.props.title}
                <div style={{width: "100%", marginTop: "10px"}}>
                    <button style={{width: "50%"}}>Approve</button>
                    <button style={{width: "50%"}}>Decline</button>
                </div>
            </div>
        )
    }
}

export default ReceivedFriendRequestItem;