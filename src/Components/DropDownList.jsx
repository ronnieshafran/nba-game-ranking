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
          width: "17%",
          height: "50px",
          margin: "25 auto",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "25px", marginRight: "20px" }}>Sort By:</h3>
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
