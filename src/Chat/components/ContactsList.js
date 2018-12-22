import React, { Component } from "react";
import "../../App.css";
import ContactListItem from "./ContactListItem";
import PendingFriendRequestItem from "./PendingFriendRequestItem";
import ReceivedFriendRequestItem from "./ReceivedFriendRequestItem";
import request from "request";
import { Button, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      pendingfriendrequests: [],
      receivedfriendrequests: [],
      identities: [],
      selectedchat: -1
    };
  }

  componentDidMount() {
    this.getIdentities();
    this.getPendingFriendRequests();
    this.getReceivedFriendRequests();
    this.getContacts();
    this.refresher = setInterval(() => {
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
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/getcontacts",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          this.setState({
            contacts: response
          });
        }
      }
    );
  }

  getReceivedFriendRequests() {
    let requestbody = {
      command: "getreceivedchatrequests"
    };
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/getreceivedchatrequests",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          this.setState({
            receivedfriendrequests: response
          });
        }
      }
    );
  }

  getPendingFriendRequests() {
    let requestbody = {
      command: "getsentchatrequests"
    };
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/getsentchatrequests",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          this.setState({
            pendingfriendrequests: response
          });
        }
      }
    );
  }

  getIdentities() {
    let requestbody = {
      command: "getidentities"
    };
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/getidentities",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          this.setState({
            identities: response
          });
        }
      }
    );
  }

  friendApproved(sender, receiver) {
    let requestbody = {
      from: sender,
      to: receiver,
      approved: true,
      command: "sendchatrequestresponse"
    };
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/sendchatrequestresponse",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          if (response.status && response.status === "success") {
            this.setState({
              receivedfriendrequests: this.state.receivedfriendrequests.filter(
                fr => !(fr.sender === sender && fr.receiver === receiver)
              )
            });
          }
        }
      }
    );
  }

  friendDeclined(sender, receiver) {
    let requestbody = {
      from: sender,
      to: receiver,
      approved: false,
      command: "sendchatrequestresponse"
    };
    requestbody = this.props.appkeys.signing.encryptPrivate(
      this.props.appserver.info.keys.communication.encrypt(
        JSON.stringify(requestbody),
        "base64"
      ),
      "base64"
    );
    request.post(
      {
        url: this.props.appserver.address + "/sendchatrequestresponse",
        body: {
          message: requestbody
        },
        json: true
      },
      (err, serres, body) => {
        if (err || serres.statusCode !== 200) {
          body = JSON.parse(
            this.props.appserver.info.keys.signing
              .decryptPublic(body)
              .toString("utf-8")
          );
          console.error(body);
        } else {
          const response = JSON.parse(
            this.props.appkeys.communication
              .decrypt(
                this.props.appserver.info.keys.signing
                  .decryptPublic(body)
                  .toString("utf-8")
              )
              .toString("utf-8")
          );
          if (response.status && response.status === "success") {
            this.setState({
              receivedfriendrequests: this.state.receivedfriendrequests.filter(
                fr => !(fr.sender === sender && fr.receiver === receiver)
              )
            });
          }
        }
      }
    );
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
      contactdivs.push(
        <ContactListItem
          onSelect={this.selectChat.bind(this)}
          key={"cli_" + contact}
          selected={contactIndex === this.state.selectedchat}
          index={contactIndex}
          sender={contact[0]}
          receiver={contact[1]}
        />
      );
    });
    this.state.pendingfriendrequests.forEach(pendingfriendrequest => {
      pendingfriendrequestdivs.push(
        <PendingFriendRequestItem
          key={"pfri_" + pendingfriendrequest}
          sender={pendingfriendrequest.sender}
          receiver={pendingfriendrequest.receiver}
          time={new Date(
            parseInt(pendingfriendrequest.sentat)
          ).toLocaleString()}
        />
      );
    });
    this.state.receivedfriendrequests.forEach(receivedfriendrequest => {
      receivedfriendrequestdivs.push(
        <ReceivedFriendRequestItem
          onApprove={this.friendApproved.bind(this)}
          onDecline={this.friendDeclined.bind(this)}
          key={"rfri_" + receivedfriendrequest}
          sender={receivedfriendrequest.sender}
          receiver={receivedfriendrequest.receiver}
          time={new Date(
            parseInt(receivedfriendrequest.receivedat)
          ).toLocaleString()}
        />
      );
    });
    if (this.state.identities.length == 1) {
      identityitems.push(
        <i key={"i_" + this.state.identities[0]} style={{ marginRight: "5px" }}>
          {this.state.identities[0]}
        </i>
      );
    } else if (this.state.identities.length == 2) {
      identityitems.push(
        <i key={"i_" + this.state.identities[0]} style={{ marginRight: "5px" }}>
          {this.state.identities[0]},
        </i>
      );
      identityitems.push(
        <i key={"i_" + this.state.identities[1]} style={{ marginRight: "5px" }}>
          {this.state.identities[1]}
        </i>
      );
    } else if (this.state.identities.length > 2) {
      identityitems.push(
        <i style={{ marginRight: "5px" }}>{this.state.identities[0]},</i>
      );
      identityitems.push(
        <i style={{ marginRight: "5px" }}>{this.state.identities[1]}</i>
      );
      identityitems.push(
        "and " + (this.state.identities.length - 2) + " others"
      );
    }
    let pendingfriendrequestsection = "";
    if (this.state.pendingfriendrequests.length > 0) {
      pendingfriendrequestsection = (
        <div
          style={{ padding: "10px", display: "flex", flexDirection: "column" }}
        >
          {pendingfriendrequestdivs}
        </div>
      );
    }
    let receivedfriendrequestsection = "";
    if (this.state.receivedfriendrequests.length > 0) {
      receivedfriendrequestsection = (
        <div
          style={{ padding: "10px", display: "flex", flexDirection: "column" }}
        >
          {receivedfriendrequestdivs}
        </div>
      );
    }

    const styles = {
      view: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "darkgray"
      },
      chatTitle: {
        color: "white",
        fontSize: "20px",
        background: "rgba(53, 58, 63,1)"
      },
      listView: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    };

    return (
      <div style={styles.view}>
        <Navbar style={{ height: "60px" }} color="dark" light expand="md">
          <NavbarBrand style={{ color: "white" }}>{identityitems}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  this.navigateTo("myidentities");
                }}
              >
                View Identities
              </Button>{" "}
            </NavItem>
            <NavItem>
              <Button
                color="primary"
                onClick={() => {
                  this.navigateTo("addchat");
                }}
              >
                Send Message
              </Button>{" "}
            </NavItem>
          </Nav>
        </Navbar>
        {receivedfriendrequestsection}
        {pendingfriendrequestsection}
        <Navbar style={styles.chatTitle} color="dark" light expand="md">
          Chats
        </Navbar>
        <div style={styles.listView}>{contactdivs}</div>
      </div>
    );
  }
}

export default ContactsList;
