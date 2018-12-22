import React, { Component } from "react";
import "../../App.css";

class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          flexDirection: "column",
          padding: "10px",
          marginBottom: "5px",
          background: this.props.selected ? "aliceblue" : "white"
        }}
      >
        <p style={{ marginBottom: "0px", fontWeight: "bold" }}>
          {this.props.sender}
        </p>
        <p style={{ marginBottom: "5px" }}>{this.props.messagetext}</p>
        <p style={{ marginBottom: "0px", fontSize: "10px", color: "gray" }}>
          {new Date(parseInt(this.props.messagetime)).toString()}
        </p>
      </div>
    );
  }
}

export default MessageItem;
