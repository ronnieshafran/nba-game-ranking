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
  #keyPlayers;

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
    this.#keyPlayers = new KeyPlayersContainer();
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

  getInjuries = (statlines) => {
    this.injuredPlayersList = this.#keyPlayers.getInjuries(statlines);
    this.injuredPlayers = this.injuredPlayersList.length > 0 ? true : false;
  };

  #determineSpecialPerformance = (game) => {
    const homeLeadingScorer = this.#findPointLeader(game.hTeam.leaders);
    const awayLeadingScorer = this.#findPointLeader(game.vTeam.leaders);
    return homeLeadingScorer >= 40 || awayLeadingScorer >= 40;
  };

  #findPointLeader = (leaders) => {
    let maxPoints = 0;
    leaders.map((leader) => {
      let currentPoints = Number(leader.points);
      if (currentPoints > maxPoints) {
        maxPoints = currentPoints;
      }
    });
    return maxPoints;
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

  hasInjuries = () => {
    return this.injuredPlayers;
  };

  getInjuredPlayersList = () => {
    if (this.injuredPlayers) {
      return this.injuredPlayersList.join(", ");
    }
    return this.injuredPlayersList;
  };

  isLargeMargin = () => {
    return this.marginAfter3 >= 15 && this.margin >= 10;
  };
  isCloseMargin = () => {
    return this.margin <= 5 || this.overtime;
  };
  isHighScore = () => {
    return this.homeTeamScore >= 120 && this.awayTeamScore >= 120;
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
