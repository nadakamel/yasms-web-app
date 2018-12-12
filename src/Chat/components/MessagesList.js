import React, { Component } from "react";

const styles = {
  container: {
    overflowY: "scroll",
    flex: 1
  },
  ul: {
    listStyle: "none"
  },
  li: {
    marginTop: 13,
    marginBottom: 13
  },
  senderUsername: {
    fontSize: 20,
    fontWeight: "bold"
  },
  message: {
    fontSize: 18,
    marginBottom: 5,
    padding: 0
  },
  timestamp: {
    color: "#808080",
    fontSize: 14
  }
};

const conversation = [
  {
    username: "nada.kamel",
    text: "Hey wassup?",
    timestamp: "01:00 pm"
  },
  {
    username: "marvel_lover_18",
    text: "All cool!",
    timestamp: "01:08 pm"
  },
  {
    username: "nada.kamel",
    text: "Good to hear that! :D",
    timestamp: "01:10 pm"
  }
];

class MessagesList extends Component {
  render() {
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container
        }}
      >
        <ul style={styles.ul}>
          {conversation.map(message => (
            <li style={styles.li} key={message}>
              <div>
                <span style={styles.senderUsername}>{message.username}</span>
              </div>
              <p style={styles.message}>{message.text}</p>
              <p style={styles.timestamp}>{message.timestamp}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessagesList;
