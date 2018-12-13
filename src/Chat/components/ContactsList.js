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
            selectedchat: ""
        };
    }

    componentDidMount() {
        this.getIdentities();
    }

    navigateTo(view) {
        this.props.onNavigate(view);
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

    render() {
        const contactdivs = [];
        const pendingfriendrequestdivs = [];
        const receivedfriendrequestdivs = [];
        const identityitems = [];
        this.state.contacts.forEach((contact) => {
            contactdivs.push(<ContactListItem key={"cli_" + contact} selected={contact === this.state.selectedchat} title={contact} />)
        });
        this.state.pendingfriendrequests.forEach((pendingfriendrequest) => {
            pendingfriendrequestdivs.push(<PendingFriendRequestItem key={"pfri_" + pendingfriendrequest} title={pendingfriendrequest} />);
        });
        this.state.receivedfriendrequests.forEach((receivedfriendrequest) => {
            receivedfriendrequestdivs.push(<ReceivedFriendRequestItem key={"rfri_" + receivedfriendrequest} title={receivedfriendrequest} />);
        });
        this.state.identities.forEach((identity) => {
            identityitems.push(<i key={"i_" + identity} style={{marginRight: "5px"}}>{identity}</i>);
        });
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
                <div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Received Friend Requests</div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column"}}>
                    {receivedfriendrequestdivs}
                </div>
                <div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Pending Friend Requests</div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column"}}>
                    {pendingfriendrequestdivs}
                </div>
                <div style={{background: "darkgray", fontSize: "10pt", paddingLeft: "5px", color: "lightgrey"}}>Chats</div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    {contactdivs}
                </div>
            </div>
        )
    }
}

export default ContactsList;