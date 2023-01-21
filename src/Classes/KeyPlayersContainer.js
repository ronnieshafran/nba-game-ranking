class KeyPlayersContainer {
  teamIdsToPlayers = {
    // Hawks
    1: {
      1046: "Young",
      382: "Murray",
    },
    // Celtics
    2: {
      882: "Tatum",
      75: "Brown",
    },
    // Nets
    4: {
      261: "Kyrie",
      153: "KD",
    },
    // Hornets
    5: {
      2566: "LaMelo",
    },
    // Bulls
    6: {
      136: "DeRozan",
      308: "Lavine",
    },
    // Cavs
    7: {
      1860: "Garland",
      727: "Allen",
      840: "Mitchell",
      2835: "Mobley",
    },
    // Mavs
    8: {
      963: "Luka",
    },
    // Nuggets
    9: {
      279: "Jokic",
      383: "Murray",
      1014: "Porter Jr.",
    },
    // Pistons
    10: {
      2801: "Cunningham",
    },
    // GSW
    11: {
      514: "Thompson",
      124: "Curry",
      204: "Green",
    },
    // Rockets
    14: {
      2810: "Green",
    },
    // Pacers
    15: {
      2595: "Haliburton",
    },
    // Clippers
    16: {
      314: "Kawhi",
      189: "PG",
    },
    // Lakers
    17: {
      265: "LeBron",
      126: "Davis",
      544: "Westbrook",
    },
    // Grizzlies
    19: {
      982: "Jackson Jr.",
      1881: "Ja",
      2568: "Bane",
    },
    // Heat
    20: {
      86: "Butler",
      724: "Bam",
    },
    // Bucks
    21: {
      20: "Giannis",
      361: "Middleton",
      242: "Holiday",
    },
    // Wolves
    22: {
      192: "Gobert",
      519: "KAT",
      2584: "Edwards",
    },
    // Pelicans
    23: {
      260: "Ingram",
      1902: "Zion",
      347: "McCollum",
    },
    // Knicks
    24: {
      441: "Randle",
      946: "Brunson",
    },
    // Thunder
    25: {
      972: "SGA",
    },
    // Magic
    26: {
      3414: "Banchero",
    },
    // 76ers
    27: {
      159: "Embiid",
      216: "Harden",
    },
    // Suns
    28: {
      64: "Booker",
      415: "CP3",
      930: "Ayton",
    },
    // Blazers
    29: {
      1023: "Simons",
      319: "Lillard",
      200: "Grant",
    },
    // Kings
    30: {
      776: "Fox",
      463: "Sabonis",
    },
    // Raptors
    38: {
      479: "Siakam",
      527: "VanVleet",
    },
    // Jazz
    40: {
      114: "Conley",
      830: "Markkanen",
    },
    // Wizards
    41: {
      2564: "Avdija",
      45: "Beal",
      432: "Porzingis",
    },
  };
  getExpectedPlayers(teamId) {
    return teamId in this.teamIdsToPlayers ? this.teamIdsToPlayers[teamId] : [];
  }

  getTeamIdsFromStatlines = (statlines) => {
    const firstId = statlines[0].teamId;
    let filteredStatlines = statlines.filter(
      (statline) => statline.teamId !== firstId
    );
    const secondId = filteredStatlines[0].teamId;
    return [firstId, secondId];
  };

  getInjuries = (statlines) => {
    let injuredPlayersIds;
    let [teamId, awayTeamId] = this.getTeamIdsFromStatlines(statlines);
    let expectedPlayersFromHomeTeam = this.getExpectedPlayers(teamId);
    let expectedPlayersFromAwayTeam = this.getExpectedPlayers(awayTeamId);
    let expectedPlayers = {
      ...expectedPlayersFromHomeTeam,
      ...expectedPlayersFromAwayTeam,
    };
    let foundPlayers = [];
    statlines.forEach((statline) => {
      const currentPlayerId = statline.playerId;
      const currentPlayerMinutes = Number(statline.min.substring(0, 2));
      if (currentPlayerId in expectedPlayers && currentPlayerMinutes > 15) {
        foundPlayers.push(currentPlayerId);
      }
    });

    injuredPlayersIds = Object.keys(expectedPlayers).filter(
      (player) => !foundPlayers.includes(player)
    );

    return injuredPlayersIds.map(
      (player) => (player = expectedPlayers[player])
    );
  };
}
export default KeyPlayersContainer;
