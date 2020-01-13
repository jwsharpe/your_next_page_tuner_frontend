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

  return (
    <li onClick={() => props.setCurBook(props)}>
      <div className="item-card-image-container">
        <img src={props.img} className="item-card-image" />
      </div>
      <div className="item-card-body">
        <div className="item-card-title">{props.titles}</div>
        <div className="item-card-description">Author: {props.authors}</div>
        <div className="item-card-description">ISBN: {+props.isbn}</div>
      </div>
    </li>
  );
}
