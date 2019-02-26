import React, { Component } from "react";
import Store from "../../../store/components/Store/Store";
import App from "../App/App";

class Root extends Component {
  render() {
    return (
      <Store>
        <App />
      </Store>
    );
  }
}

export default Root;
