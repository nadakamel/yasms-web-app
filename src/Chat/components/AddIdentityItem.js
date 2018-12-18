import React, { Component } from "react";
import "../../App.css";
import { ListGroupItem } from "reactstrap";

class AddIdentityItem extends Component {
  constructor(props) {
    super(props);
  }

  addIdentity() {
    this.props.onAdd(this.props.title);
  }

  render() {
    return (
      <ListGroupItem>
        <div
          style={{
            cursor: "pointer",
            fontStyle: "italics",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
          onClick={this.addIdentity.bind(this)}
        >
          <span style={{ flex: 1 }}>{this.props.title}</span>
          <i className="fas fa-plus" style={{ fontSize: "20px" }} />
        </div>
      </ListGroupItem>
    );
  }
}

export default AddIdentityItem;
