import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
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
          width: "55%",
          justifyContent: "center",
          textAlign: "center",
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
            <tr key={game.id}>
              <th scope="row">
                {this.props.displayedGamesList.indexOf(game) + 1}
              </th>
              <td>
                {game.homeTeamName}
                <Image src={game.homeTeamLogoLink} style={{ width: "70px" }} />
              </td>
              <td>
                {game.awayTeamName}{" "}
                <Image src={game.awayTeamLogoLink} style={{ width: "70px" }} />
              </td>
              <td>{this.generateBadges(game)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default GamesTable;
