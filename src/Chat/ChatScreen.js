import React, { Component } from "react";
import ContactsList from "./components/ContactsList";
import MyIdentities from './components/MyIdentities';
import AddChat from './components/AddChat';
import ChatWindow from './components/ChatWindow';

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
      sidepanelview: "chatlist",
      selectedChat: null
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    alert(text);
  }

  onNavigate(view) {
    this.setState({
      sidepanelview: view,
      selectedChat: null
    });
  }

  setSelectedChat(sender, receiver) {
    this.setState({
      selectedChat: {
        sender: sender,
        receiver: receiver
      }
    })
  }

  render() {
    let sidepanelview;
    let mainstageview;
    switch (this.state.sidepanelview) {
      case "chatlist":
        sidepanelview = <ContactsList onSelect={this.setSelectedChat.bind(this)} appserver={this.props.appserver} appkeys={this.props.appkeys} onNavigate={this.onNavigate.bind(this)} />;
        break;
      case "myidentities":
        sidepanelview = <MyIdentities appserver={this.props.appserver} appkeys={this.props.appkeys} onNavigate={this.onNavigate.bind(this)} />;
        break;
      case "addchat":
        sidepanelview = <AddChat appserver={this.props.appserver} appkeys={this.props.appkeys} onNavigate={this.onNavigate.bind(this)} />;
        break;
      default:
        sidepanelview = <div />;
    }
    mainstageview = (this.state.sidepanelview === "chatlist" && this.state.selectedChat) ? <ChatWindow sender={this.state.selectedChat.sender} receiver={this.state.selectedChat.receiver} appserver={this.props.appserver} appkeys={this.props.appkeys} /> : <div />;
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
