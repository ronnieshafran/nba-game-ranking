class KeyPlayersContainer {
  keyPlayersIdNameMap;
  keyPlayersTeamIdMap;

  constructor() {
    const keyPlayersList = [
      ["64", "Booker"],
      ["963", "Luka"],
      ["216", "Harden"],
      ["1902", "Zion"],
      ["544", "Westbrook"],
      ["242", "Holiday"],
      ["432", "Porzingis"],
      ["260", "Ingram"],
      ["897", "White"],
      ["136", "DeRozan"],
      ["538", "Kemba"],
      ["882", "Tatum"],
      ["227", "Hayward"],
      ["75", "Brown"],
      ["261", "Kyrie"],
      ["159", "Embiid"],
      ["153", "KD"],
      ["479", "Siakam"],
      ["327", "Lowry"],
      ["527", "VanVleet"],
      ["481", "Simmons"],
      ["540", "Warren"],
      ["361", "Middleton"],
      ["20", "Giannis"],
      ["86", "Butler"],
      ["724", "Bam"],
      ["177", "Fournier"],
      ["279", "Jokic"],
      ["383", "Murray"],
      ["415", "CP3"],
      ["4", "Adams"],
      ["181", "Gallo"],
      ["319", "Dame"],
      ["347", "CJ"],
      ["840", "Mitchell"],
      ["398", "Nurkic"],
      ["192", "Gobert"],
      ["114", "Conley"],
      ["314", "Kawhi"],
      ["265", "LeBron"],
      ["126", "AD"],
      ["1881", "Ja"],
      ["189", "PG"],
      ["403", "Oladipo"],
      ["982", "Jackson Jr."],
    ];
    const keyPlayersTeamList = [
      ["2", ["538", "882", "227", "75"]],
      ["4", ["153", "261"]],
      ["8", ["963", "432"]],
      ["9", ["279", "383"]],
      ["14", ["216", "544"]],
      ["15", ["540", "403"]],
      ["16", ["314", "189"]],
      ["17", ["265", "126"]],
      ["19", ["982", "1881"]],
      ["20", ["86", "724"]],
      ["21", ["20", "361"]],
      ["23", ["242", "260", "1902"]],
      ["25", ["4", "415", "181"]],
      ["26", ["177"]],
      ["27", ["481", "159"]],
      ["28", ["64"]],
      ["29", ["398", "319", "347"]],
      ["31", ["136", "897"]],
      ["38", ["479", "327", "527"]],
      ["40", ["192", "114", "840"]],
    ];
    this.keyPlayersIdNameMap = new Map(keyPlayersList);
    this.keyPlayersTeamIdMap = new Map(keyPlayersTeamList);
  }

  #getTeamIdsFromStatlines = (statlines) => {
    const firstId = statlines[0].teamId;
    let filteredStatlines = statlines.filter(
      (statline) => statline.teamId !== firstId
    );
    const secondId = filteredStatlines[0].teamId;
    return [firstId, secondId];
  };

  getInjuries = (statlines) => {
    let injuredPlayers;
    let teamIds = this.#getTeamIdsFromStatlines(statlines);
    let expectedPlayersFromHomeTeam = this.keyPlayersTeamIdMap.has(teamIds[0])
      ? this.keyPlayersTeamIdMap.get(teamIds[0])
      : [];
    let expectedPlayersFromAwayTeam = this.keyPlayersTeamIdMap.has(teamIds[1])
      ? this.keyPlayersTeamIdMap.get(teamIds[1])
      : [];
    let expectedPlayers = expectedPlayersFromHomeTeam.concat(
      expectedPlayersFromAwayTeam
    );
    let foundPlayers = [];
    statlines.forEach((statline) => {
      const currentPlayerId = statline.playerId;
      const currentPlayerMinutes = Number(statline.min.substring(0, 2));
      if (
        expectedPlayers.includes(currentPlayerId) &&
        currentPlayerMinutes > 15
      ) {
        foundPlayers.push(currentPlayerId);
      }
    });

    injuredPlayers = expectedPlayers.filter(
      (player) => !foundPlayers.includes(player)
    );

    return injuredPlayers.map(
      (player) => (player = this.keyPlayersIdNameMap.get(player))
    );
  };
}
export default KeyPlayersContainer;
