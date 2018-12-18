import React, { Component } from "react";
import "../../App.css";
import AddIdentityItem from "./AddIdentityItem";
import request from "request";
import { ListGroup, Navbar } from "reactstrap";

class AddChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identities: [],
      identityname: "",
      myidentities: []
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
            myidentities: response
          });
        }
      }
    );
  }

  searchForIdentity(evt) {
    evt.preventDefault();
    if (this.state.identityname.length > 0) {
      let requestbody = {
        query: this.state.identityname
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
          url: this.props.appserver.address + "/searchidentities",
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
              identities: response.identities.map(
                identity => identity.identityname
              )
            });
          }
        }
      );
    }
  }

  onAdd(identityname) {
    const from = window.prompt(
      "Enter an identity name you wish to send request from"
    );
    if (this.state.myidentities.indexOf(from) > -1) {
      let requestbody = {
        identitynamefrom: from,
        identitynameto: identityname
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
          url: this.props.appserver.address + "/sendchatrequest",
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
            switch (body.yasmscode) {
              case 3:
                alert("User is offline");
              case 4:
                alert("Chat already requested");
            }
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
              this.navigateTo("chatlist");
            }
          }
        }
      );
    } else {
      alert("Identity entered is not one you own");
    }
  }

  handleInputChange(evt) {
    this.setState({
      identityname: evt.target.value
    });
  }

  render() {
    const identityitems = [];
    this.state.identities.forEach(identity => {
      identityitems.push(
        <AddIdentityItem
          key={"id_" + identity}
          title={identity}
          onAdd={this.onAdd.bind(this)}
        />
      );
    });

    const styles = {
      view: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "darkgray"
      },
      toolbar: {
        height: "60px",
        background: "darkgray",
        padding: "10px",
        display: "flex",
        flexDirection: "row"
      },
      toolbarHeader: {
        fontSize: "25pt",
        float: "left",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        alignSelf: "flex-start",
        height: "100%"
      },
      toolbarContents: {
        height: "60px",
        background: "darkgray",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      },
      backButton: {
        color: "white",
        border: "none",
        padding: "8px",
        marginRight: "10px",
        fontSize: "25px",
        cursor: "pointer"
      },
      identityTextView: {
        display: "flex",
        flexDirection: "row",
        flex: 1
      },
      identityTextField: {
        flex: 1,
        height: "35px"
      },
      searchButton: {
        background: "#027BFF",
        color: "white",
        border: "none",
        padding: "8px",
        marginLeft: "10px",
        fontSize: "20px",
        borderRadius: "5px",
        cursor: "pointer"
      },
      identityNamesList: {
        fontSize: "18px"
      }
    };

    return (
      <div style={styles.view}>
        <Navbar color="dark" light expand="md">
          <i
            className="fas fa-arrow-left"
            style={styles.backButton}
            onClick={() => {
              this.navigateTo("chatlist");
            }}
          />
          <form
            style={styles.identityTextView}
            onSubmit={this.searchForIdentity.bind(this)}
          >
            <input
              type="text"
              style={styles.identityTextField}
              placeholder="Enter the identity name here"
              onChange={this.handleInputChange.bind(this)}
              value={this.state.newidentityname}
            />
            <button
              type="submit"
              className="fas fa-search"
              style={styles.searchButton}
            />
          </form>
        </Navbar>
        <ListGroup style={styles.identityNamesList}>{identityitems}</ListGroup>
      </div>
    );
  }
}

export default AddChat;
