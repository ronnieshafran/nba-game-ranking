import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
class GamesTable extends Component {
  generateBadges = (game) => {
    const badgeStyle = {
      display: "flex",
      justifyContent: "space-between",
      width: "65%",
    };
    if (game.isLargeMargin() && game.isHighScore()) {
      return (
        <div style={badgeStyle}>
          <Badge variant="success">Bucket Fest</Badge>
          <Badge variant="danger">Blowout</Badge>{" "}
        </div>
      );
    } else if (game.isLargeMargin()) {
      return (
        <div>
          <Badge variant="danger">Blowout</Badge>
        </div>
      );
    } else if (game.isCloseMargin() && !game.isHighScore()) {
      return (
        <div style={badgeStyle}>
          <Badge variant="dark">Tight D</Badge>{" "}
          <Badge variant="secondary">Nail Biter</Badge>
        </div>
      );
    } else if (game.isCloseMargin() && game.isHighScore()) {
      return (
        <div style={badgeStyle}>
          <Badge variant="success">Bucket Fest</Badge>
          <Badge variant="secondary">Nail Biter</Badge>
        </div>
      );
    } else if (!game.isHighScore()) {
      return (
        <div>
          <Badge variant="dark">Tight D</Badge>
        </div>
      );
    } else if (game.isCloseMargin()) {
      return (
        <div>
          <Badge variant="secondary">Nail Biter</Badge>
        </div>
      );
    }
  };

  render() {
    return (
      <table
        className="table table-hover table-responsive"
        style={{
          display: "table",
          width: "50%",
          justifyContent: "center",
        }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Game Rank</th>
            <th scope="col">Home Team</th>
            <th scope="col">Away Team</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {this.props.displayedGamesList.map((game) => (
            <tr>
              <th scope="row">
                {" "}
                {this.props.displayedGamesList.indexOf(game) + 1}
              </th>
              <td>{game.homeTeamName}</td>
              <td>{game.awayTeamName}</td>
              <td>{this.generateBadges(game)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default GamesTable;
