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

    searchForIdentity() {
        console.log("searchingfor", this.state.identityname);
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
                    <input type="text" style={{flex: 1, height: "30px"}} placeholder="Identity Name" onChange={this.handleInputChange.bind(this)} value={this.state.newidentityname}></input>
                    <i className="fas fa-search" style={{marginLeft: "10px", fontSize: "20px", cursor: "pointer"}} onClick={() => {this.searchForIdentity();}}></i>
                </div>
                <div style={{padding: "10px", display: "flex", flexDirection: "column", flex: 1}}>
                    {identityitems}
                </div>
            </div>
        )
    }
}

export default AddChat;