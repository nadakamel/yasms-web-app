import React, { Component } from "react";
import "../../App.css";

class ContactListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        onClick={() => {
          this.props.onSelect(
            this.props.sender,
            this.props.receiver,
            this.props.index
          );
        }}
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          marginBottom: "5px",
          borderRadius: "5px",
          background: this.props.selected ? "rgba(178, 225, 83, 1)" : "white"
        }}
      >
        {this.props.sender}: {this.props.receiver}
      </div>
    );
  }
}

export default ContactListItem;
