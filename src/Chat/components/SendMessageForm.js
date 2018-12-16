import React, { Component } from "react";

const styles = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20
  },
  form: {
    display: "flex",
    flex: 1
  },
  input: {
    color: "inherit",
    background: "white",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16,
    borderRadius: "100px",
    padding: "15px"
  }
};

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    let form = "Sorry, you can't send messages to this identity";
    if (this.props.cansend) {
      form = <form onSubmit={this.onSubmit} style={styles.form}>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  onChange={this.onChange}
                  value={this.state.text}
                  style={styles.input}
                />
                <button type="submit" className="fas fa-paper-plane" style={{fontSize: "20pt", background: "rgba(0,0,0,0)", border: "none"}} />
              </form>;
    }
    return (
      <div style={{display: "flex", flexDirection: "row", flex: 1}}>
          {form}
      </div>
    );
  }
}

export default SendMessageForm;
