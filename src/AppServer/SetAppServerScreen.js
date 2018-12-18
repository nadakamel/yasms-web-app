import React, { Component } from "react";
import "./SetAppServerScreen.css";
import "../App.css";
import request from "request";
import NodeRSA from "node-rsa";

class SetAppServerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { centralserverpath: "http://localhost:" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      centralserverpath: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.centralserverpath === "")
      alert("Please enter central server path");
    else this.tryToSetAppServerPath(this.state.centralserverpath);
  }

  tryToSetAppServerPath(path) {
    request.post(
      {
        url: path + "/ping"
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          alert("Wrong server path entered");
        } else {
          body = JSON.parse(body);
          if (body.status === "online") {
            body.keys.communication = new NodeRSA(body.keys.communication);
            body.keys.signing = new NodeRSA(body.keys.signing);
            this.props.onSet(path, body);
          }
        }
      }
    );
  }

  render() {
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.handleSubmit}>
          <p className="App-title">YASMS</p>
          <p className="App-subtitle">A secure messaging app</p>
          <input
            className="Login-textfield"
            type="text"
            placeholder="App Server Path"
            value={this.state.centralserverpath}
            onChange={this.handleInputChange}
          />
          <input
            className="Login-button"
            type="submit"
            value="Set Application Server"
          />
        </form>
      </div>
    );
  }
}

export default SetAppServerScreen;
