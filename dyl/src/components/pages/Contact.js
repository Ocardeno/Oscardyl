import React, { Component } from "react";
import axios from "axios";
import Jumbotroncontact from "../../components/layouts/Jumbotroncontact.js";
import { Container } from "react-bootstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      lastname: " ",
      email: " ",
      messsage: " ",
      sent: false,
    };
    this.handleName = this.handleName.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleMessage(e) {
    //console.log("paso por aqui");
    this.setState({
      messsage: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let data = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      message: this.state.messsage,
    };
    // alert('A name was submitted: '+data);

    axios
      .post("http://localhost:4001/email/sendMail", data)
      .then((res) => {
        this.setState(
          {
            sent: true,
          },
          this.resetContact()
        );
        //alert('message sent'+ data.message);
      })
      .catch((e) => {
        // alert('message not sent'+e);
      });
  }

  resetContact() {
    this.setState({
      name: " ",
      lastname: " ",
      email: " ",
      messsage: " ",
    });

    setTimeout(() => {
      this.setState({
        sent: false,
      });
    }, 3000);
  }

  render() {
    return (
      <div className="container">
        <Container className="container">
          <form onSubmit={this.handleSubmit}>
            <Jumbotroncontact />

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="your name..."
                value={this.state.name}
                onChange={this.handleName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="your lastname..."
                value={this.state.lastname}
                onChange={this.handleLastname}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="your email..."
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </div>

            <div className="textArea singleItem">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id=" "
                cols="30"
                rows="5"
                className="form-control"
                placeholder="your message..."
                value={this.state.message}
                onChange={this.handleMessage}
              ></textarea>
            </div>

            <div className={this.state.sent ? "msg msgAppear" : "msg"}>
              Message has been sent
            </div>
            <div className="btn1">
              <button
                className="btn pink lightne-1 z-depth-0"
                type="submit"
                onclick={this.handleSubmit}
                value="Submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}
export default Contact;
