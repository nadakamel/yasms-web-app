import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "LandingScreen"
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

  render() {
    if (this.state.currentScreen === "LoginScreen") {
      return <LoginScreen />;
    }
    if (this.state.currentScreen === "RegisterScreen") {
      return <RegisterScreen />;
    }
    if (this.state.currentScreen === "LandingScreen") {
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
