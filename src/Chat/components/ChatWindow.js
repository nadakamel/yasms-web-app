import React, { Component } from "react";
import "../../App.css"
import request from 'request';
import SendMessageForm from './SendMessageForm';
import MessageItem from './MessageItem';

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
        this.getmessages();
        setInterval(()=>{
            this.getmessages();
        }, 1000);
    }

    componentWillUnmount() {
        //clearInterval();
    }

    componentWillUpdate() {
        this.currentsender = this.props.sender;
        this.currentreceiver = this.props.receiver;
    }

    componentDidUpdate() {
        if (this.props.sender !== this.currentsender || this.props.receiver !== this.currentreceiver) {
            this.cansend();
        }
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
              } else {
                  this.setState({
                      cansend: false
                  });
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

    getmessages() {
        let requestbody = {
            persona: this.props.sender,
            personb: this.props.receiver,
            command: "getmessages"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
              url: this.props.appserver.address + "/getmessages",
              body: {
                  message: requestbody
              },
              json: true
          }, (err, serres, body) => {
              if (err || serres.statusCode !== 200) {
                  body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'));
                  console.error(body);
              } else {
                const response = JSON.parse(this.props.appkeys.communication.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8'));
                if (response.status && response.status === "success") {
                  this.setState({
                      messages: response.messages
                  });
                }
              }
          });
    }

    block() {
      let requestbody = {
        identitynamefrom: this.props.sender,
        identitynameto: this.props.receiver,
        command: "block"
      };
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

    onSendMessage(messagestring) {
        let requestbody = {
            from: this.props.receiver,
            to: this.props.sender,
            message: messagestring,
            command: "sendmessage",
            time: (new Date()).getTime()
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
              url: this.props.appserver.address + "/sendmessage",
              body: {
                  message: requestbody
              },
              json: true
          }, (err, serres, body) => {
              if (err || serres.statusCode !== 200) {
                  body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'));
                  if (body.error && body.error === this.props.sender + " refused message") {
                      this.setState({
                          cansend: false
                      });
                  }
              } else {
                const response = JSON.parse(this.props.appkeys.communication.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8'));
              }
          });
    }

    render() {
        const messageitems = [];
        this.state.messages.forEach((message)=>{
            messageitems.push(<MessageItem key={"message_"+message.sender+"_"+message.receiver+"_"+parseInt(message.sentat)} sender={message.sender} messagetime={message.sentat} messagetext={message.messagetext} />)
        });
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
                    {messageitems}
                </div>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    <SendMessageForm onSubmit={this.onSendMessage.bind(this)} cansend={this.state.cansend} />
                </div>
            </div>
        )
    }
}

export default ChatWindow;