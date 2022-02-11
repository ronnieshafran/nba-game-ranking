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
      // ["261", "Kyrie"],
      ["153", "KD"],
      ["481", "Simmons"],
      //Hornets
      ["2566", "LaMelo"],
      ["227", "Hayward"],
      ["458", "Rozier"],
      //Bulls
      ["136", "DeRozan"],
      ["308", "Lavine"],
      ["534", "Vucevic"],
      //Cavaliers
      ["1860", "Garland"],
      ["727", "Allen"],
      //Mavericks
      ["963", "Luka"],
      //Nuggets
      ["279", "Jokic"],
      ["383", "Murray"],
      //Pistons
      ["200", "Grant"],
      ["2801", "Cunningham"],
      //GSW
      ["514", "Klay"],
      ["124", "Steph"],
      ["204", "Draymond"],
      //Rockets
      ["560", "Wood"],
      ["2810", "Green"],
      //Pacers
      ["2595", "Haliburton"],
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
      ["2568", "Bane"],
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
      ["347", "CJ"],
      //Knicks
      ["441", "Randle"],
      ["177", "Fournier"],
      //Thunder
      ["972", "SGA"],
      //76ers
      ["159", "Embiid"],
      ["216", "Harden"],
      //Suns
      ["64", "Booker"],
      ["415", "CP3"],
      ["930", "Ayton"],
      //Blazers
      ["319", "Dame"],
      ["398", "Nurkic"],
      //Kings
      ["776", "Fox"],
      ["463", "Sabonis"],
      //Spurs
      ["382", "Murray"],
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
      ["432", "Porzingis"],
    ];
    const keyPlayersTeamList = [
      ["1", ["1046", "761"]], // hawks
      ["2", ["882", "75"]], // celtics
      ["4", ["153", "481", "261"]], //nets
      ["5", ["2566", "227", "458"]], //horntes
      ["6", ["136", "308", "534"]], //bulls
      ["7", ["1860", "727"]], //Cavs
      ["8", ["963"]], //mavs
      ["9", ["279", "383"]], // nuggets
      ["10", ["200", "2801"]], // pistons
      ["11", ["514", "124", "204"]], // GSW
      ["14", ["560", "2810"]], // Rockets
      ["15", ["2595"]], //Pacers
      ["16", ["314", "189"]], // Clippers
      ["17", ["265", "126", "544"]], // Lakers
      ["19", ["982", "1881", "2568"]], // Grizzlies
      ["20", ["86", "724", "327"]], // Heat
      ["21", ["20", "361", "242"]], // Bucks
      ["22", ["462", "519", "2584"]], // Wolves
      ["23", ["260", "1902", "347"]], // Pelicans
      ["24", ["441", "177"]], // Knicks
      ["25", ["972"]], // Thunder
      ["27", ["159", "216"]], // 76ers
      ["28", ["64", "415", "930"]], // Suns
      ["29", ["398", "319"]], // Blazers
      ["30", ["776", "463"]], // Kings
      ["31", ["382"]], // Spurs
      ["38", ["479", "527"]], // Raptors
      ["40", ["192", "114", "840"]], // Jazz
      ["41", ["2564", "45", "432"]], // Wizards
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
