class KeyPlayersContainer {
  keyPlayersIdNameMap;
  keyPlayersTeamIdMap;

  constructor() {
    const keyPlayersList = [
      // hawks
      ["1046", "Young"],
      ["761", "Collins"],
      // Celtics
      ["882", "Tatum"],
      ["75", "Brown"],
      // Nets
      ["216", "Harden"],
      ["261", "Kyrie"],
      ["153", "KD"],
      //Hornets
      ["2566", "LaMelo"],
      ["227", "Hayward"],
      ["458", "Rozier"],
      //Bulls
      ["136", "DeRozan"],
      ["308", "Lavine"],
      ["534", "Vucevic"],
      //Cavaliers
      ["1021", "Sexton"],
      ["1860", "Garland"],
      //Mavericks
      ["963", "Luka"],
      ["432", "Porzingis"],
      //Nuggets
      ["279", "Jokic"],
      ["383", "Murray"],
      //Pistons
      ["200", "Grant"],
      //GSW
      ["514", "Klay"],
      ["124", "Steph"],
      ["204", "Draymond"],
      //Rockets
      ["539", "Wall"],
      ["560", "Wood"],
      //Pacers
      ["317", "LeVert"],
      ["463", "Sabonis"],
      ["540", "Warren"],
      ["71", "Brogdon"],
      //Clippers
      ["314", "Kawhi"],
      ["189", "PG"],
      //Lakers
      ["544", "Westbrook"],
      ["265", "LeBron"],
      ["126", "AD"],
      //Grizzlies
      ["1881", "Ja"],
      ["982", "Jackson Jr."],
      //Heat
      ["327", "Lowry"],
      ["86", "Butler"],
      ["724", "Bam"],
      //Bucks
      ["242", "Holiday"],
      ["361", "Middleton"],
      ["20", "Giannis"],
      //Timberwolves
      ["462", "Russell"],
      ["519", "KAT"],
      ["2584", "Edwards"],
      //Pelicans
      ["1902", "Zion"],
      ["260", "Ingram"],
      //Knicks
      ["538", "Kemba"],
      ["441", "Randle"],
      ["177", "Fournier"],
      //Thunder
      ["972", "SGA"],
      ["2633", "Poku :)"],
      //76ers
      ["481", "Simmons"],
      ["159", "Embiid"],
      //Suns
      ["64", "Booker"],
      ["415", "CP3"],
      ["930", "Ayton"],
      //Blazers
      ["319", "Dame"],
      ["347", "CJ"],
      ["398", "Nurkic"],
      //Kings
      ["776", "Fox"],
      ["2595", "Haliburton"],
      //Spurs
      //Raptors
      ["479", "Siakam"],
      ["527", "VanVleet"],
      //Jazz
      ["840", "Mitchell"],
      ["192", "Gobert"],
      ["114", "Conley"],
      //Wizards
      ["45", "Beal"],
      ["2564", "Avdija"],
    ];
    const keyPlayersTeamList = [
      ["1", ["1046", "761"]],
      ["2", ["882", "75"]],
      ["4", ["153", "261", "216"]],
      ["5", ["2566", "227", "458"]],
      ["6", ["136", "308", "534"]],
      ["7", ["1021", "1860"]],
      ["8", ["963", "432"]],
      ["9", ["279", "383"]],
      ["10", ["200"]],
      ["11", ["514", "124", "204"]],
      ["14", ["539", "560"]],
      ["15", ["540", "317", "463", "71"]],
      ["16", ["314", "189"]],
      ["17", ["265", "126", "544"]],
      ["19", ["982", "1881"]],
      ["20", ["86", "724", "327"]],
      ["21", ["20", "361", "242"]],
      ["22", ["462", "519", "2584"]],
      ["23", ["260", "1902"]],
      ["24", ["538", "441", "177"]],
      ["25", ["972", "2633"]],
      ["27", ["481", "159"]],
      ["28", ["64", "415", "930"]],
      ["29", ["398", "319", "347"]],
      ["38", ["479", "527"]],
      ["40", ["192", "114", "840"]],
      ["41", ["2564", "45"]],
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
