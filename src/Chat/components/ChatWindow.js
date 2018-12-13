import React, { Component } from "react";
import "../../App.css"
import request from 'request';
import SendMessageForm from './SendMessageForm';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
            ],
            cansend: false
        };
    }

    componentDidMount() {
      this.cansend();
    }

    componentWillUnmount() {
        //clearInterval();
    }

    componentDidUpdate() {
      this.cansend();
    }

    cansend() {
      let requestbody = {
        identitynamefrom: this.props.receiver,
        identitynameto: this.props.sender,
        command: "cansend"
      };
      requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
      request.post({
          url: this.props.appserver.address + "/cansend",
          body: {
              message: requestbody
          },
          json: true
      }, (err, serres, body) => {
          if (err || serres.statusCode !== 200) {
              body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'));
              if (!(body.error && body.error === "can't send")) {
                console.error(body);
              }
          } else {
            const response = JSON.parse(this.props.appkeys.communication.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8'));
            if (response.status && response.status === "success") {
              this.setState({
                cansend: true
              });
            }
          }
      });
    }

    block() {
      console.log("BLOCK");
      let requestbody = {
        identitynamefrom: this.props.sender,
        identitynameto: this.props.receiver,
        command: "block"
      };
      console.log("BLOCK", requestbody);
      requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
      request.post({
          url: this.props.appserver.address + "/block",
          body: {
              message: requestbody
          },
          json: true
      }, (err, serres, body) => {
          if (err || serres.statusCode !== 200) {
              body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'));
              console.error(body);
          }
      });
    }

    render() {
        let sendform = "Sorry. You can't send messages to this person.";
        if (this.state.cansend) {
          sendform = <SendMessageForm />
        }
        return(
            <div style={{display: "flex", flexDirection: "column", width: "100%", flex: 1}}>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    <div style={{float: "left", display: "flex", flexDirection: "row", flexGrow: 1}}>
                        {this.props.sender}: {this.props.receiver}
                    </div>
                    <div style={{cursor: "pointer", float: "left", display: "flex", alignItems: "center", fontSize: "25pt", flexDirection: "row-reverse", width: "30%", alignItems: "right"}}>
                        <i className="fas fa-ban" style={{marginLeft: "10px"}} onClick={this.block.bind(this)}></i>
                    </div>
                </div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    
                </div>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    {sendform}
                </div>
            </div>
        )
    }
}

export default ChatWindow;