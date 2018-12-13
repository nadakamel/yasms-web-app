import React, { Component } from "react";
import "./LoginScreen.css";
import "../App.css";
import request from 'request';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: ""};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    if (event.target.name === "username")
      this.setState({ username: event.target.value });
    else this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === "" && this.state.password === "")
      alert("Missing fields!");
    else if (this.state.username === "")
      alert("You forgot to enter your username");
    else if (this.state.password === "")
      alert("You forgot to enter your passsword");
    else if (this.state.username !== "" && this.state.password !== "")
      this.tryToLogin(this.state.username, this.state.password);
  }

  tryToLogin(username, password) {
    let requestbody = {
      username: username,
      keyfile: password,
      appsigningkey: this.props.appsigningkey.exportKey('public'),
      appcommunicationkey: this.props.appcommunicationkey.exportKey('public')
    };
    requestbody = this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64');
    request.post({
      url: this.props.appserver.address + "/login",
      body: {
        message: requestbody
      },
      json: true
    }, (err, serres, body) => {
      if (err || serres.statusCode !== 200) {
        alert(JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).message);
      } else {
        const decrpytedresponse = JSON.parse(this.props.appcommunicationkey.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8'));
        if (decrpytedresponse.status && decrpytedresponse.status === "success") {
          this.props.onLogin();
        }
      }
    });
  }

  readFile = (evt) => {
    evt.preventDefault();

    let reader = new FileReader();
    let file = evt.target.files[0];

    if (file) {
      reader.onload = (thefile) => {
          this.setState({
              password: JSON.parse(thefile.target.result)
          });
      }
      reader.readAsText(file);
    } else {
      this.setState({
        password: ""
      });
    }

  }

  render() {
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.handleSubmit}>
          <p className="App-title">YASMS</p>
          <input
            className="Login-textfield"
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input type="file" onChange={this.readFile.bind(this)}/>
          <input className="Login-button" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginScreen;
