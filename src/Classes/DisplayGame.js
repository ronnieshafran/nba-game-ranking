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

  constructor(game) {
    const { gameId } = game;
    this.id = gameId;
    this.fillHomeTeamDetails(game);
    this.fillAwayTeamDetails(game);
    this.totalScore = Number(this.homeTeamScore) + Number(this.awayTeamScore);
    this.margin = Math.abs(Number(this.homeTeamScore - this.awayTeamScore));
  }

  fillHomeTeamDetails = (game) => {
    const {
      hTeam: {
        fullName,
        logo,
        score: { points },
      },
    } = game;
    this.homeTeamName = fullName;
    this.homeTeamLogoLink = logo;
    this.homeTeamScore = points;
  };

  fillAwayTeamDetails = (game) => {
    const {
      vTeam: {
        fullName,
        logo,
        score: { points },
      },
    } = game;
    this.awayTeamName = fullName;
    this.awayTeamLogoLink = logo;
    this.awayTeamScore = points;
  };

  isLargeMargin = () => {
    return this.margin >= 15 ? true : false;
  };
  isCloseMargin = () => {
    return this.margin <= 5 ? true : false;
  };
  isHighScore = () => {
    return this.homeTeamScore >= 100 && this.awayTeamScore >= 100
      ? true
      : false;
  };
}
export default DisplayGame;
