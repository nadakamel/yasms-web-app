import React, { Component } from "react";
import "../../App.css"

class IdentityItem extends Component {
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

export default IdentityItem;