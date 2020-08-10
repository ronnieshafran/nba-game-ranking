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

  constructor(game) {
    /**
     * used to obtain the basic data from games during the basic API call:
     * getting the games played at the desired date.
     * totalScoreAfter3, overtime and specialPerformance
     * will be obtained from gameDetails API call afterwards.
     */
    const { gameId } = game;
    this.id = gameId;
    this.#fillHomeTeamDetails(game);
    this.#fillAwayTeamDetails(game);
    this.totalScore = Number(this.homeTeamScore) + Number(this.awayTeamScore);
    this.margin = Math.abs(Number(this.homeTeamScore - this.awayTeamScore));
  }

  #fillHomeTeamDetails = (game) => {
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

  #fillAwayTeamDetails = (game) => {
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

  fillGameDetails = (game) => {
    this.overtime = this.#determineOT(game);
    this.marginAfter3 = this.#aggregateMarginAfter3(game);
    this.specialPerformance = this.#determineSpecialPerformance(game);
  };

  #determineSpecialPerformance = (game) => {
    const homeLeadingScorer = Number(game.hTeam.leaders[0].points);
    const awayLeadingScorer = Number(game.vTeam.leaders[0].points);
    // console.log("hteam leader: " + homeLeadingScorer);
    // console.log("vteam leader: " + awayLeadingScorer);
    return homeLeadingScorer >= 40 || awayLeadingScorer >= 40;
  };

  #getScoreAfter3 = (linescore) => {
    return Number(linescore[0]) + Number(linescore[1]) + Number(linescore[2]);
  };

  #aggregateMarginAfter3 = (game) => {
    const homeTeamScoreAfter3 = this.#getScoreAfter3(
      game.hTeam.score.linescore
    );
    const awayTeamScoreAfter3 = this.#getScoreAfter3(
      game.vTeam.score.linescore
    );
    return Math.abs(homeTeamScoreAfter3 - awayTeamScoreAfter3);
  };

  isSpecialPerformance = () => {
    return this.specialPerformance;
  };

  isLargeMargin = () => {
    const answer =
      this.marginAfter3 >= 15 && this.margin >= 15 ? "blowout" : "no";
    // console.log(
    //   this.id + ": " + this.marginAfter3 + ", " + this.margin + ", " + answer
    // );
    return this.marginAfter3 >= 15 && this.margin >= 15;
  };
  isCloseMargin = () => {
    return this.margin <= 5 || this.overtime;
  };
  isHighScore = () => {
    return this.homeTeamScore >= 110 && this.awayTeamScore >= 110;
  };
  isLowScore = () => {
    return this.homeTeamScore <= 100 && this.awayTeamScore <= 100;
  };

  #determineOT = (game) => {
    const { currentPeriod } = game;
    return Number(currentPeriod.charAt(0)) > 4;
  };
}
export default DisplayGame;
