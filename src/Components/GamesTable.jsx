import React from "react";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

function GamesTable(props) {
  const { badgeList, preferredBadges } = props;

  let badgeMap = new Map();
  badgeMap.set(badgeList[0], "danger");
  badgeMap.set(badgeList[1], "success");
  badgeMap.set(badgeList[2], "secondary");
  badgeMap.set(badgeList[3], "warning");
  badgeMap.set(badgeList[4], "dark");
  badgeMap.set(badgeList[5], "primary");

  let toolTipMap = new Map();
  toolTipMap.set(badgeList[0], "This game wasn't close!");
  toolTipMap.set(badgeList[1], "Both teams scored a lot!");
  toolTipMap.set(badgeList[2], "It came down to the wire!");
  toolTipMap.set(badgeList[4], "Low score, good defense!");
  toolTipMap.set(badgeList[5], "Someone went OFF!");

  let generateBadges = (game) => {
    toolTipMap.set(badgeList[3], game.injuredPlayersList);

    let gameBadges = [];
    if (game.isLargeMargin && preferredBadges.includes(badgeList[0])) {
      gameBadges.push(badgeList[0]);
    }
    if (game.isHighScore && preferredBadges.includes(badgeList[1])) {
      gameBadges.push(badgeList[1]);
    }
    if (game.isSmallMargin && preferredBadges.includes(badgeList[2])) {
      gameBadges.push(badgeList[2]);
    }
    if (game.injuredPlayers && preferredBadges.includes(badgeList[3])) {
      gameBadges.push(badgeList[3]);
    }
    if (game.isLowScore && preferredBadges.includes(badgeList[4])) {
      gameBadges.push(badgeList[4]);
    }
    if (game.specialPerformance && preferredBadges.includes(badgeList[5])) {
      gameBadges.push(badgeList[5]);
    }
    return (
      <div
        style={{
          display: "grid",
        }}
      >
        {gameBadges.map((badge, index) => (
          <OverlayTrigger
            key={index}
            //eslint-disable-next-line
            overlay={
              <Tooltip id="tooltip-disabled">{toolTipMap.get(badge)}</Tooltip>
            }
          >
            <span className="d-inline-block">
              <Badge
                key={index}
                variant={badgeMap.get(badge)}
                disabled
                style={{ pointerEvents: "none" }}
              >
                {badge}
              </Badge>
            </span>
          </OverlayTrigger>
        ))}
      </div>
    );
  };

  const tdCenterStyle = { verticalAlign: "middle" };
  const length = props.displayedGamesList.length;
  if (length == 0) {
    return <h3 style={{ textAlign: "center" }}>No Games Played Today!</h3>;
  }
  return (
    <Table
      className="table table-hover table-responsive"
      style={{
        display: "table",
        width: "50%",
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
        {props.displayedGamesList.map((game) => (
          <tr key={game.id}>
            <td style={tdCenterStyle}>
              {props.displayedGamesList.indexOf(game) + 1}
            </td>
            <td style={tdCenterStyle}>
              {game.homeTeamName}
              <Image src={game.homeTeamLogoLink} style={{ width: "65px" }} />
            </td>
            <td style={tdCenterStyle}>
              {game.awayTeamName}{" "}
              <Image src={game.awayTeamLogoLink} style={{ width: "65px" }} />
            </td>
            <td style={tdCenterStyle}>{generateBadges(game)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GamesTable;
