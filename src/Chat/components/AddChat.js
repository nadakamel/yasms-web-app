import React, { Component } from "react";
import "../../App.css";
import AddIdentityItem from './AddIdentityItem';
import request from 'request';

class AddChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identities: [
            ],
            identityname: ""
        };
    }

    componentDidMount() {
        
    }

    navigateTo(view) {
        this.props.onNavigate(view);
    }

    searchForIdentity(evt) {
          evt.preventDefault();
          if(this.state.identityname.length > 0) {
            let requestbody = {
                query: this.state.identityname
            };
            requestbody = this.props.appkeys.signing.encryptPrivate(this.props.appserver.info.keys.communication.encrypt(JSON.stringify(requestbody), 'base64'), 'base64');
            request.post({
                url: this.props.appserver.address + "/searchidentities",
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
                    identities: response.identities.map((identity)=>(identity.identityname))
                });
                }
            });
          }
    }

    onAdd(identityname) {
        console.log("IDENTITY NAME", identityname);
    }

    handleInputChange(evt) {
        this.setState({
            identityname: evt.target.value
        });
    }

    render() {
        const identityitems = [];
        this.state.identities.forEach((identity) => {
            identityitems.push(<AddIdentityItem key={"id_" + identity} title={identity} onAdd={this.onAdd.bind(this)} />);
        });
        return(
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <div style={{height: "60px", background: "darkgray", padding: "10px", display: "flex", flexDirection: "row"}}>
                    <div style={{fontSize: "25pt", float: "left", display: "flex", flexDirection: "row", flexGrow: 1, alignSelf: "flex-start", height: "100%"}}>
                        <i className="fas fa-arrow-left" style={{cursor: "pointer"}} onClick={() => {this.navigateTo("chatlist");}} />
                    </div>
                </div>
                <div style={{background: "darkgray", padding: "10px", display: "flex", height: "60px", flexDirection: "row", alignItems: "center"}}>
                    <form style={{display: "flex", flexDirection: "row", flex: 1}} onSubmit={this.searchForIdentity.bind(this)}><input type="text" style={{flex: 1, height: "30px"}} placeholder="Identity Name" onChange={this.handleInputChange.bind(this)} value={this.state.newidentityname}></input>
                    <button type="submit" className="fas fa-search" style={{background: "rgba(0,0,0,0)", border: "none", marginLeft: "10px", fontSize: "20px", cursor: "pointer"}} /></form>
                </div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    {identityitems}
                </div>
            </div>
        )
    }
}

export default AddChat;