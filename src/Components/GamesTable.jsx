import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

class GamesTable extends Component {
  generateBadges = (game) => {
    let badgeMap = new Map();
    badgeMap.set("Bucket Fest", "success");
    badgeMap.set("Blowout", "danger");
    badgeMap.set("Tight D", "dark");
    badgeMap.set("Clutch", "secondary");

    let badgeList = [];
    if (game.isCloseMargin()) {
      badgeList.push("Clutch");
    }
    if (game.isLargeMargin()) {
      badgeList.push("Blowout");
    }
    if (game.isHighScore()) {
      badgeList.push("Bucket Fest");
    }
    if (game.isLowScore()) {
      badgeList.push("Tight D");
    }
    return (
      <React.Fragment>
        {badgeList.map((badge, index) => (
          <Badge key={index} variant={badgeMap.get(badge)}>
            {badge}
          </Badge>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const tdCenterStyle = { verticalAlign: "middle" };
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
            <th scope="col">Tags</th>
          </tr>
        </thead>
        <tbody>
          {this.props.displayedGamesList.map((game) => (
            <tr key={game.id}>
              <td style={tdCenterStyle}>
                {this.props.displayedGamesList.indexOf(game) + 1}
              </td>
              <td style={tdCenterStyle}>
                {game.homeTeamName}
                <Image src={game.homeTeamLogoLink} style={{ width: "70px" }} />
              </td>
              <td style={tdCenterStyle}>
                {game.awayTeamName}{" "}
                <Image src={game.awayTeamLogoLink} style={{ width: "70px" }} />
              </td>
              <td style={tdCenterStyle}>{this.generateBadges(game)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default GamesTable;
