import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class DropDown extends Component {
  render() {
    const options = ["Highest Score", "Closest Margin"];
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "26%",
          height: "50px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ fontSize: "25px" }}>Select Sorting Method:</h3>
        <Dropdown
          options={options}
          onChange={this.props.onChange}
          value={options[0]}
        />
      </div>
    );
  }
}

export default DropDown;
