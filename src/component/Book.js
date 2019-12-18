import React, { useState } from "react";
import { Button } from "@material-ui/core";

export default function Book(props) {
  const [opened, setOpened] = useState(false);

  const _toggleOpen = () => {
    setOpened(!opened);
  };

  const _findRecommendations = e => {
    e.preventDefault();

    const body = {
      text: props.titles
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
        props.setRecs(["" + props.titles, ...e]);
      });
  };

  return (
    <li className="card" onClick={_toggleOpen}>
      <h6>{props.authors}</h6>
      <p>{props.titles}</p>
      {opened ? (
        <>
          <p>
            {props.description} amount:{props.pages}
          </p>
          <div class="rec-button">
            <Button
              variant="outlined"
              color="primary"
              onClick={_findRecommendations}
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
