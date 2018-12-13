import React, { Component } from "react";
import "../../App.css"

class AddIdentityItem extends Component {
    constructor(props) {
        super(props);
        
    }

    addIdentity() {
        this.props.onAdd(this.props.title);
    }

    render() {
        return(
            <div style={{cursor: "pointer", fontStyle: "italics", display: "flex", flexDirection: "row", alignItems: "center"}} onClick={this.addIdentity.bind(this)}>
                <span style={{flex: 1}}>{this.props.title}</span>
                <i className="fas fa-plus" style={{}}></i>
            </div>
        )
    }
}

export default AddIdentityItem;