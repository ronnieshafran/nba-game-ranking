class DisplayGame {
  id;
  homeTeamName;
  homeTeamLogoLink;
  homeTeamScore;
  awayTeamName;
  awayTeamLogoLink;
  awayTeamScore;
  margin;
  totalScore;
  marginAfter3;
  overtime;
  specialPerformance;
  injuredPlayers;
  injuredPlayersList;
  isSmallMargin;
  isLargeMargin;
  isHighScore;
  isLowScore;

  constructor(game) {
    /**
     * used to obtain the basic data from games during the basic API call:
     * getting the games played at the desired date.
     * totalScoreAfter3, overtime and specialPerformance
     * will be obtained from gameDetails API call afterwards.
     */
    const {
      gameId,
      injuredPlayers,
      isClutch,
      isBlowout,
      // isHotGame,
      // isDuel,
      totalScore,
      margin,
      isSpecialPerformance,
      homeTeam,
      awayTeam,
      isBucketFest,
      isTightD,
    } = game;
    this.id = gameId;
    this.specialPerformance = isSpecialPerformance;
    this.injuredPlayersList = injuredPlayers
      .filter((playerName) => playerName !== "")
      .join(", ");
    this.injuredPlayers = this.injuredPlayersList.length > 0 ? true : false;
    this.isLowScore = isTightD;
    this.isHighScore = isBucketFest;
    this.isSmallMargin = isClutch;
    this.isLargeMargin = isBlowout;
    this.homeTeamName = homeTeam.fullName;
    this.homeTeamLogoLink = homeTeam.logo;
    this.awayTeamName = awayTeam.fullName;
    this.awayTeamLogoLink = awayTeam.logo;
    this.margin = margin;
    this.totalScore = totalScore;
  }
}
export default DisplayGame;
