import React, { Component } from "react";
import "./RegisterScreen.css";
import "../App.css";
import ChatScreen from "../Chat/ChatScreen";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", currentScreen: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    if (event.target.name === "username")
      this.setState({ username: event.target.value });
    else this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.username === "" && this.state.password === "")
      alert("Missing fields!");
    else if (this.state.username === "")
      alert("You forgot to enter your username");
    else if (this.state.password === "")
      alert("You forgot to enter your passsword");
    else if (this.state.username !== "" && this.state.password !== "")
      this.setState({ currentScreen: "ChatScreen" });
    event.preventDefault();
  }

  render() {
    if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen username={this.state.username} />;
    }
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.handleSubmit}>
          <p className="App-title">YASMS</p>
          <input
            className="Register-textfield"
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            className="Register-textfield"
            id="password"
            name="password"
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input className="Register-button" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default RegisterScreen;
