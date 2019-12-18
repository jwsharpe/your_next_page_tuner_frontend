import React from "react";
import { Button } from "@material-ui/core";

export default function RecBar(props) {
  return (
    <>
      <h1>{props.book}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={props.clearRecs}
        fullWidth
        type="submit"
        name="clear"
      >
        Clear Recs
      </Button>
    </>
  );
}
