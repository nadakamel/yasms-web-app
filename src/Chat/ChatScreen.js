import React, { Component } from "react";
import ContactsList from "./components/ContactsList";
import MyIdentities from './components/MyIdentities';
import AddChat from './components/AddChat';

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
    width: "30%",
    flex: "none",
    display: "flex"
  },
  chatListContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      sidepanelview: "addchat"
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    alert(text);
  }

  onNavigate(view) {
    this.setState({
      sidepanelview: view
    });
  }

  render() {
    let sidepanelview;
    let mainstageview;
    switch (this.state.sidepanelview) {
      case "chatlist":
        sidepanelview = <ContactsList onNavigate={this.onNavigate.bind(this)} />;
        break;
      case "myidentities":
        sidepanelview = <MyIdentities onNavigate={this.onNavigate.bind(this)} />;
        break;
      case "addchat":
        sidepanelview = <AddChat onNavigate={this.onNavigate.bind(this)} />;
        break;
      default:
        sidepanelview = <div />;
    }
    mainstageview = sidepanelview === "chatlist" ? <div /> : <div />;
    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            {sidepanelview}
          </aside>
          <section style={styles.chatListContainer}>
            {mainstageview}
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
