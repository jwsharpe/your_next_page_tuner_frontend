import React, { useState } from "react";
import { Button } from "@material-ui/core";

export default function Book(props) {
  const [opened, setOpened] = useState(false);

  const _toggleOpen = e => {
    const buttonTarget = e.target.closest("button");
    if (buttonTarget) {
      if (buttonTarget.id !== "rec-toggle-button") setOpened(!opened);
    } else {
      setOpened(!opened);
    }
  };

  const _findRecommendations = async e => {
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

    const res = await fetch("http://localhost:5000/books", content);
    const json = res.json();
    props.setRecs(["" + props.titles, ...json]);
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
              id="rec-toggle-button"
              variant="outlined"
              color="primary"
              onClick={_findRecommendations}
              title="hi"
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
