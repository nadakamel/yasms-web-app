import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";
import ChatScreen from "./Chat/ChatScreen";
import NodeRSA from "node-rsa";
import SetAppServerScreen from "./AppServer/SetAppServerScreen";

class App extends Component {
  constructor(props) {
    super(props);
    const appcommunicationkey = new NodeRSA().generateKeyPair(1024);
    const appsigningkey = new NodeRSA().generateKeyPair(1024);
    this.state = {
      currentScreen: "SetAppServerScreen",
      keys: {
        communication: appcommunicationkey,
        signing: appsigningkey
      },
      appserver: {}
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ currentScreen: "LoginScreen" });
  }

  handleRegisterClick() {
    this.setState({ currentScreen: "RegisterScreen" });
  }

  handleLogin() {
    this.setState({
      currentScreen: "ChatScreen"
    });
  }

  handleAppServerSet(serverpath, serverpingresponse) {
    this.setState({
      appserver: {
        address: serverpath,
        info: serverpingresponse
      },
      currentScreen: "LandingScreen"
    });
  }

  handleRegister() {
    this.setState({
      currentScreen: "LoginScreen"
    });
  }

  render() {
    switch (this.state.currentScreen) {
      case "SetAppServerScreen":
        return (
          <SetAppServerScreen onSet={this.handleAppServerSet.bind(this)} />
        );
      case "LoginScreen":
        return (
          <LoginScreen
            onLogin={this.handleLogin.bind(this)}
            appserver={this.state.appserver}
            appsigningkey={this.state.keys.signing}
            appcommunicationkey={this.state.keys.communication}
          />
        );
      case "RegisterScreen":
        return (
          <RegisterScreen
            appserver={this.state.appserver}
            appkey={this.state.keys.communication}
            onRegister={this.handleRegister.bind(this)}
          />
        );
      case "ChatScreen":
        return (
          <ChatScreen
            appserver={this.state.appserver}
            appkeys={this.state.keys}
          />
        );
      case "LandingScreen":
        return (
          <div className="App">
            <header className="App-header">
              <p className="App-title">YASMS</p>
              <p className="App-subtitle">A secure messaging app</p>
              <button className="App-button" onClick={this.handleLoginClick}>
                Login
              </button>
              <button className="App-button" onClick={this.handleRegisterClick}>
                Register
              </button>
            </header>
          </div>
        );
    }
  }
}

export default App;
