import React from "react";
import { render } from "react-dom";

function Test() {
  return <p>Test.</p>;
}

render(<Test />, document.getElementById("app"));
