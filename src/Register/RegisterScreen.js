import React, { Component } from "react";
import "./RegisterScreen.css";
import "../App.css";
import request from 'request';
import fileDownload from 'js-file-download';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: ""};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === "")
      alert("You forgot to enter your username");
    else
      this.tryToRegister(this.state.username);
  }

  tryToRegister(username) {
    let requestbody = {
      username: username,
      communicationkey: this.props.appkey.exportKey('public')
    };
    requestbody = this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64');
    request.post({
      url: this.props.appserver.address + "/register",
      body: {
        message: requestbody
      },
      json: true
    }, (err, serres, body) => {
      if (err || serres.statusCode !== 200) {
        body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'))
        if (body.yasmscode === 2) {
          alert("Username already taken.");
        } else {
          alert("Problem with the server");
        }
      } else {
        const keyfile = this.props.appkey.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8');
        fileDownload(keyfile, username + ".key");
        this.props.onRegister();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.handleSubmit}>
          <input
            className="Register-textfield"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input className="Register-button" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default RegisterScreen;
