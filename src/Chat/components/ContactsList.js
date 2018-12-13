import React, { Component } from "react";
import "../../App.css"
import ContactListItem from './ContactListItem';
import PendingFriendRequestItem from './PendingFriendRequestItem';
import ReceivedFriendRequestItem from './ReceivedFriendRequestItem';
import request from 'request';

class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
            ],
            pendingfriendrequests: [
            ],
            receivedfriendrequests: [
            ],
            identities: [
            ],
            selectedchat: -1
        };
    }

    componentDidMount() {
        this.getIdentities();
        this.getPendingFriendRequests();
        this.getReceivedFriendRequests();
        this.getContacts();
        this.refresher = setInterval(()=>{
            this.getPendingFriendRequests();
            this.getReceivedFriendRequests();
            this.getContacts();
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.refresher);
    }

    navigateTo(view) {
        this.props.onNavigate(view);
    }

    getContacts() {
        let requestbody = {
            command: "getcontacts"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/getcontacts",
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
              this.setState({
                  contacts: response
              })
            }
          });
    }

    getReceivedFriendRequests() {
        let requestbody = {
            command: "getreceivedchatrequests"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/getreceivedchatrequests",
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
              this.setState({
                  receivedfriendrequests: response
              });
            }
          });
    }

    getPendingFriendRequests() {
        let requestbody = {
            command: "getsentchatrequests"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/getsentchatrequests",
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
              this.setState({
                  pendingfriendrequests: response
              });
            }
          });
    }

    getIdentities() {
          let requestbody = {
            command: "getidentities"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/getidentities",
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
              this.setState({
                identities: response
              });
            }
          });
    }

    friendApproved(sender, receiver) {
        let requestbody = {
            from: sender,
            to: receiver,
            approved: true,
            command: "sendchatrequestresponse"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/sendchatrequestresponse",
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
                      receivedfriendrequests: this.state.receivedfriendrequests.filter((fr)=>(!(fr.sender === sender && fr.receiver === receiver)))
                  })
              }
            }
          });
    }

    friendDeclined(sender, receiver) {
        let requestbody = {
            from: sender,
            to: receiver,
            approved: false,
            command: "sendchatrequestresponse"
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/sendchatrequestresponse",
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
                      receivedfriendrequests: this.state.receivedfriendrequests.filter((fr)=>(!(fr.sender === sender && fr.receiver === receiver)))
                  })
              }
            }
          });
    }

    selectChat(sender, receiver, index) {
        this.setState({
            selectedchat: index
        });
        this.props.onSelect(sender, receiver);
    }

    render() {
        const contactdivs = [];
        const pendingfriendrequestdivs = [];
        const receivedfriendrequestdivs = [];
        const identityitems = [];
        this.state.contacts.forEach((contact, contactIndex) => {
            contactdivs.push(<ContactListItem onSelect={this.selectChat.bind(this)} key={"cli_" + contact} selected={contactIndex === this.state.selectedchat} index={contactIndex} sender={contact[0]} receiver={contact[1]} />)
        });
        this.state.pendingfriendrequests.forEach((pendingfriendrequest) => {
            pendingfriendrequestdivs.push(<PendingFriendRequestItem key={"pfri_" + pendingfriendrequest} sender={pendingfriendrequest.sender} receiver={pendingfriendrequest.receiver} time={(new Date(parseInt(pendingfriendrequest.sentat))).toLocaleString()} />);
        });
        this.state.receivedfriendrequests.forEach((receivedfriendrequest) => {
            receivedfriendrequestdivs.push(<ReceivedFriendRequestItem onApprove={this.friendApproved.bind(this)} onDecline={this.friendDeclined.bind(this)} key={"rfri_" + receivedfriendrequest} sender={receivedfriendrequest.sender} receiver={receivedfriendrequest.receiver} time={(new Date(parseInt(receivedfriendrequest.receivedat))).toLocaleString()} />);
        });
        this.state.identities.forEach((identity) => {
            identityitems.push(<i key={"i_" + identity} style={{marginRight: "5px"}}>{identity}</i>);
        });
        let pendingfriendrequesttitle = "";
        let pendingfriendrequestsection = "";
        if (this.state.pendingfriendrequests.length > 0) {
            pendingfriendrequesttitle = (<div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Pending Friend Requests</div>);
            pendingfriendrequestsection = (<div style={{padding: "10px", display: "flex", flexDirection: "column"}}>
                {pendingfriendrequestdivs}
            </div>);
        }
        let receivedfriendrequesttitle = "";
        let receivedfriendrequestsection = "";
        if (this.state.receivedfriendrequests.length > 0) {
            receivedfriendrequesttitle = (<div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Received Friend Requests</div>);
            receivedfriendrequestsection = (<div style={{padding: "10px", display: "flex", flexDirection: "column"}}>
            {receivedfriendrequestdivs}
        </div>);
        }
        return(
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    <div style={{float: "left", display: "flex", flexDirection: "row", flexGrow: 1, alignSelf: "flex-start", height: "100%"}}>
                        {identityitems}
                    </div>
                    <div style={{cursor: "pointer", float: "left", display: "flex", alignItems: "center", fontSize: "25pt", flexDirection: "row-reverse", width: "30%", alignSelf: "flex-end", alignItems: "right", height: "100%"}}>
                        <i className="fas fa-plus" style={{marginLeft: "10px"}} onClick={() => {this.navigateTo("addchat")}}></i>
                        <i className="fas fa-user" onClick={() => {this.navigateTo("myidentities")}}></i>
                    </div>
                </div>
                {receivedfriendrequesttitle}
                {receivedfriendrequestsection}
                {pendingfriendrequesttitle}
                {pendingfriendrequestsection}
                <div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Chats</div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    {contactdivs}
                </div>
            </div>
        )
    }
}

export default ContactsList;