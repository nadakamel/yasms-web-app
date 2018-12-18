import React, { Component } from "react";
import "../../App.css";
import request from "request";
import { ListGroup, ListGroupItem, Navbar } from "reactstrap";

class MyIdentities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identities: [],
      newidentityname: ""
    };
  }

  componentDidMount() {
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

  navigateTo(view) {
    this.props.onNavigate(view);
  }

  tryToAddIdentity(evt) {
    evt.preventDefault();
    if (this.state.newidentityname == "") {
      alert("Missing field!");
    } else {
      let requestbody = {
        identityname: this.state.newidentityname
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
          url: this.props.appserver.address + "/addidentity",
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
            if (body.yasmscode === 2) {
              alert("Identity name already taken");
            } else {
              alert("Problem with the server");
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
              this.setState({
                identities: [
                  ...this.state.identities,
                  this.state.newidentityname
                ],
                newidentityname: ""
              });
            }
          }
        }
      );
    }
  }

  handleInputChange(evt) {
    this.setState({
      newidentityname: evt.target.value
    });
  }

  render() {
    const identityitems = [];
    this.state.identities.forEach(identity => {
      console.log(identityitems);
      identityitems.push(
        <ListGroupItem key={"id_" + identity}>{identity}</ListGroupItem>
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
      addButton: {
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
            onSubmit={this.tryToAddIdentity.bind(this)}
          >
            <input
              type="text"
              style={styles.identityTextField}
              placeholder="Enter your new identity name here"
              onChange={this.handleInputChange.bind(this)}
              value={this.state.newidentityname}
            />
            <button
              type="submit"
              className="fas fa-plus"
              style={styles.addButton}
            />
          </form>
        </Navbar>
        <ListGroup style={styles.identityNamesList}>{identityitems}</ListGroup>
      </div>
    );
  }
}

export default MyIdentities;
