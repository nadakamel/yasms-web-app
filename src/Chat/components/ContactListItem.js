import React, { Component } from "react";
import "../../App.css"

class ContactListItem extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div onClick={() => {this.props.onSelect(this.props.sender, this.props.receiver, this.props.index);}} style={{height: "50px", display: "flex", alignItems: "center", border: "solid 1px", padding: "10px", cursor: "pointer", marginBottom: "5px", background: this.props.selected ? "aliceblue" : "white"}}>
                {this.props.sender}: {this.props.receiver}
            </div>
        )
    }
}

export default ContactListItem;