import KeyPlayersContainer from "./KeyPlayersContainer.js";
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
  #keyPlayers;

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
      isHotGame,
      isDuel,
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
    this.injuredPlayersList = injuredPlayers;
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

    // this.id = gameId;
    // this.#fillHomeTeamDetails(game);
    // this.#fillAwayTeamDetails(game);
    // this.totalScore = Number(this.homeTeamScore) + Number(this.awayTeamScore);
    // this.margin = Math.abs(Number(this.homeTeamScore - this.awayTeamScore));
    // this.#keyPlayers = new KeyPlayersContainer();
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
    this.isSmallMargin = this.margin <= 5 || this.overtime;
    this.isLargeMargin = this.marginAfter3 >= 15 && this.margin >= 10;
    this.isHighScore = this.homeTeamScore >= 120 && this.awayTeamScore >= 120;
    this.isLowScore = this.homeTeamScore <= 100 && this.awayTeamScore <= 100;
  };

  getInjuries = (statlines) => {
    this.injuredPlayersList = this.#keyPlayers.getInjuries(statlines);
    this.injuredPlayers = this.injuredPlayersList.length > 0 ? true : false;
    if (this.injuredPlayers) {
      this.injuredPlayersList = this.injuredPlayersList.join(", ");
    }
  };

  getTopScorer = (statlines) => {
    let max = 0;
    statlines.forEach((statline) => {
      const currentPlayerPoints = Number(statline.points);
      max = currentPlayerPoints > max ? currentPlayerPoints : max;
    });
    this.specialPerformance = max >= 40;
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

  #determineOT = (game) => {
    const { currentPeriod } = game;
    return Number(currentPeriod.charAt(0)) > 4;
  };
}
export default DisplayGame;
