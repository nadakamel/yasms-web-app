import React, { Component } from "react";
import "../../App.css";
import IdentityItem from './IdentityItem';
import request from 'request';

class MyIdentities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identities: [
            ],
            newidentityname: ""
        };
    }

    componentDidMount() {
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

    navigateTo(view) {
        this.props.onNavigate(view);
    }

    tryToAddIdentity(evt) {
          evt.preventDefault();
          let requestbody = {
            identityname: this.state.newidentityname
          };
          requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
          request.post({
            url: this.props.appserver.address + "/addidentity",
            body: {
              message: requestbody
            },
            json: true
          }, (err, serres, body) => {
            if (err || serres.statusCode !== 200) {
              body = JSON.parse(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8'));
              console.error(body);
              if (body.yasmscode === 2) {
                alert("Identity Name already taken.");
              } else {
                alert("Problem with the server");
              }
            } else {
              const response = JSON.parse(this.props.appkeys.communication.decrypt(this.props.appserver.info.keys.signing.decryptPublic(body).toString('utf-8')).toString('utf-8'));
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
          });
    }

    handleInputChange(evt) {
        this.setState({
            newidentityname: evt.target.value
        });
    }

    render() {
        const identityitems = [];
        this.state.identities.forEach((identity) => {
            identityitems.push(<IdentityItem key={"id_" + identity} title={identity} />);
        });
        return(
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    <div style={{fontSize: "25pt", float: "left", display: "flex", flexDirection: "row", flexGrow: 1, alignSelf: "flex-start", height: "100%"}}>
                        <i className="fas fa-arrow-left" style={{cursor: "pointer"}} onClick={() => {this.navigateTo("chatlist");}} />
                    </div>
                </div>
                <div style={{background: "darkgray", padding: "10px", display: "flex", height: "60px", flexDirection: "row", alignItems: "center"}}>
                    <form style={{display: "flex", flexDirection: "row", flex: 1}} onSubmit={this.tryToAddIdentity.bind(this)}><input type="text" style={{flex: 1, height: "30px"}} placeholder="Identity Name" onChange={this.handleInputChange.bind(this)} value={this.state.newidentityname}></input>
                    <button type="submit" className="fas fa-plus" style={{background: "rgba(0,0,0,0)", border: "none", marginLeft: "10px", fontSize: "20px", cursor: "pointer"}} /></form>
                </div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    {identityitems}
                </div>
            </div>
        )
    }
}

export default MyIdentities;