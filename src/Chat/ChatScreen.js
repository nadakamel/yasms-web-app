import React, { Component } from "react";
import MessagesList from "./components/MessagesList";
import SendMessageForm from "./components/SendMessageForm";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  chatContainer: {
    display: "flex",
    flex: 1
  },
  whosOnlineListContainer: {
    width: "300px",
    flex: "none",
    padding: 20,
    backgroundColor: "#2c303b",
    color: "white"
  },
  chatListContainer: {
    padding: 20,
    width: "85%",
    display: "flex",
    flexDirection: "column"
  }
};

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    alert(text);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h2>Who's online PLACEHOLDER</h2>
          </aside>
          <section style={styles.chatListContainer}>
            <MessagesList />
            <SendMessageForm onSubmit={this.sendMessage} />
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
