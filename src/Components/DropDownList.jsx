import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class DropDown extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "13%",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "25px", marginRight: "15px" }}>Sort By:</h3>
        <Dropdown
          options={this.props.options}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default DropDown;
