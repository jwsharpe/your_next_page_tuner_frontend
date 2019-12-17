import React, { Component } from "react";
import { Button } from "@material-ui/core";

export default class Book extends Component {
  state = {
    opened: false
  };

  toggleOpen = () => {
    this.setState(prev => {
      return {
        opened: !prev.opened
      };
    });
  };

  _handleSubmit = e => {
    e.preventDefault();

    const body = {
      text: this.props.titles
    };
    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    fetch("http://localhost:5000/books", content)
      .then(res => res.json())
      .then(e => {
        console.log(e);
        this.props.setRecs(["" + this.props.titles, ...e]);
      });
  };

  render() {
    return (
      <li className="card" onClick={this.toggleOpen}>
        <h6>{this.props.authors}</h6>
        <p>{this.props.titles}</p>
        {this.state.opened ? (
          <>
            <p>
              {this.props.description} amount:{this.props.pages}
            </p>
            <div class="rec-button">
              <Button
                variant="outlined"
                color="primary"
                onClick={this._handleSubmit}
              >
                i want mor of dis
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
      </li>
    );
  }
}
