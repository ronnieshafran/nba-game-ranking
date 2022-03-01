using DateFetcher.Data_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using GamesDetailsResponse = DateFetcher.Data_Model.Response_JSON_Models.GameDetailsResponse;
using GamesResponse = DateFetcher.Data_Model.Response_JSON_Models.GamesResponse;
using PlayerGameStatsResponse = DateFetcher.Data_Model.Response_JSON_Models.PlayerGameStatsResponse;
using StandingsResponse = DateFetcher.Data_Model.Response_JSON_Models.StandingsResponse;

namespace DateFetcher
{
    public class GamesProvider
    {
        private static Dictionary<string, string> StarsDict { get; set; }
        private static Dictionary<string, List<string>> TeamStarsDict { get; set; }

        private static Dictionary<string, string> InitStarsDict()
        {
            return new Dictionary<string, string>()
            {
                // Hawks
                { "1046", "Young" },
                { "761", "Collins" },
                // Celtics
                { "882", "Tatum" },
                { "75", "Brown" },
                // Nets
                { "153", "KD" },
                { "481", "Simmons" },
                { "261", "Kyrie" },
                // Hornets
                { "2566", "LaMelo" },
                { "227", "Hayward" },
                { "458", "Rozier" },
                // Bulls
                { "136", "DeRozan" },
                { "308", "Lavine" },
                { "534", "Vucevic" },
                // Cavs
                { "1860", "Garland" },
                { "727", "Allen" },
                // Mavs
                { "963", "Luka" },
                // Nuggets
                { "279", "Jokic" },
                { "383", "Murray" },
                // Pistons
                { "200", "Grant" },
                { "2801", "Cunningham" },
                //GSW
                { "514", "Klay" },
                { "124", "Steph" },
                { "204", "Draymond" },
                //Rockets
                { "560", "Wood" },
                { "2810", "Green" },
                //Pacers
                { "2595", "Haliburton" },
                //Clippers
                { "314", "Kawhi" },
                { "189", "PG" },
                //Lakers
                { "544", "Westbrook" },
                { "265", "LeBron" },
                { "126", "AD" },
                //Grizzlies
                { "1881", "Ja" },
                { "982", "Jackson Jr." },
                { "2568", "Bane" },
                //Heat
                { "327", "Lowry" },
                { "86", "Butler" },
                { "724", "Bam" },
                //Bucks
                { "242", "Holiday" },
                { "361", "Middleton" },
                { "20", "Giannis" },
                //Timberwolves
                { "462", "Russell" },
                { "519", "KAT" },
                { "2584", "Edwards" },
                //Pelicans
                { "1902", "Zion" },
                { "260", "Ingram" },
                { "347", "CJ" },
                //Knicks
                { "441", "Randle" },
                { "177", "Fournier" },
                //Thunder
                { "972", "SGA" },
                //76ers
                { "159", "Embiid" },
                { "216", "Harden" },
                //Suns
                { "64", "Booker" },
                { "415", "CP3" },
                { "930", "Ayton" },
                //Blazers
                { "319", "Dame" },
                { "398", "Nurkic" },
                //Kings
                { "776", "Fox" },
                { "463", "Sabonis" },
                //Spurs
                { "382", "Murray" },
                //Raptors
                { "479", "Siakam" },
                { "527", "VanVleet" },
                //Jazz
                { "840", "Mitchell" },
                { "192", "Gobert" },
                { "114", "Conley" },
                //Wizards
                { "45", "Beal" },
                { "2564", "Avdija" },
                { "432", "Porzingis" }
            };
        }

        private static Dictionary<string, List<string>> InitTeamStarsDict()
        {
            return new Dictionary<string, List<string>>()
            {
                { "1", new List<string>() { "1046", "761" } }, // hawks
                { "2", new List<string>() { "882", "75" } }, // celtics
                { "4", new List<string>() { "153", "481", "261" } }, //nets
                { "5", new List<string>() { "2566", "227", "458" } }, //horntes
                { "6", new List<string>() { "136", "308", "534" } }, //bulls
                { "7", new List<string>() { "1860", "727" } }, //Cavs
                { "8", new List<string>() { "963" } }, //mavs
                { "9", new List<string>() { "279", "383" } }, // nuggets
                { "10", new List<string>() { "200", "2801" } }, // pistons
                { "11", new List<string>() { "514", "124", "204" } }, // GSW
                { "14", new List<string>() { "560", "2810" } }, // Rockets
                { "15", new List<string>() { "2595" } }, //Pacers
                { "16", new List<string>() { "314", "189" } }, // Clippers
                { "17", new List<string>() { "265", "126", "544" } }, // Lakers
                { "19", new List<string>() { "982", "1881", "2568" } }, // Grizzlies
                { "20", new List<string>() { "86", "724", "327" } }, // Heat
                { "21", new List<string>() { "20", "361", "242" } }, // Bucks
                { "22", new List<string>() { "462", "519", "2584" } }, // Wolves
                { "23", new List<string>() { "260", "1902", "347" } }, // Pelicans
                { "24", new List<string>() { "441", "177" } }, // Knicks
                { "25", new List<string>() { "972" } }, // Thunder
                { "26", new List<string>() }, // Magic
                { "27", new List<string>() { "159", "216" } }, // 76ers
                { "28", new List<string>() { "64", "415", "930" } }, // Suns
                { "29", new List<string>() { "398", "319" } }, // Blazers
                { "30", new List<string>() { "776", "463" } }, // Kings
                { "31", new List<string>() { "382" } }, // Spurs
                { "38", new List<string>() { "479", "527" } }, // Raptors
                { "40", new List<string>() { "192", "114", "840" } }, // Jazz
                { "41", new List<string>() { "2564", "45", "432" } }, // Wizards
            };
        }

        static async Task Main(string[] args)
        {
            await GetGamesFromDate("2022-02-28");
        }

        public static async Task<IEnumerable<Game>> GetGamesFromDate(string date)
        {
            StarsDict = InitStarsDict();
            TeamStarsDict = InitTeamStarsDict();
            var finalGamesList = new List<Game>();
            var standingsDict = await InitStandingsDict();

            //Games API call
            var games = await GetInitialGamesList(date);
            if (games != null && games.Length > 0)
                foreach (var game in games)
                {
                    bool isBlowout, isClutch, isBucketFest, isTightD, isSpecialPerformance, isDuel, isHotGame;
                    List<string> injuredPlayersList;

                    var homeTeam = new Team()
                    {
                        Name = game.hTeam.fullName,
                        LogoURL = game.hTeam.logo,
                        Standing = standingsDict[game.hTeam.teamId],
                        TeamId = game.hTeam.teamId
                    };
                    var awayTeam = new Team()
                    {
                        Name = game.vTeam.fullName,
                        LogoURL = game.vTeam.logo,
                        Standing = standingsDict[game.vTeam.teamId],
                        TeamId = game.vTeam.teamId
                };
                    var finalPeriod = game.currentPeriod[0]; // format is x:4, if x>4 then there was overtime
                    if (int.TryParse(finalPeriod.ToString(), out var finalPeriodInt))
                    {
                        if (finalPeriodInt == 0)
                            continue;
                    }

                    var overtime = finalPeriodInt > 4;
                    
                    if (!int.TryParse(game.hTeam.score.points, out var homeTeamScore) || !int.TryParse(game.vTeam.score.points, out var awayTeamScore))
                        continue;
                    isClutch = IsClutch(homeTeamScore, awayTeamScore, overtime);
                    isBucketFest = IsHighScore(homeTeamScore, awayTeamScore);
                    isTightD = IsLowScore(homeTeamScore, awayTeamScore);
                    // Game Details API call
                    var marginAfter3 = await GetMarginAfter3(game.gameId);
                    isBlowout = IsBlowout(homeTeamScore, awayTeamScore, marginAfter3);
                    // Player Statistics By Game API call
                    (isSpecialPerformance, isDuel, injuredPlayersList) = await GetPlayerStatsData(game.gameId, homeTeam.TeamId, awayTeam.TeamId);
                    isHotGame = IsHotGame(homeTeam, awayTeam);
                    finalGamesList.Add(new Game()
                    {
                        Date = date,
                        GameId = game.gameId,
                        AwayTeam = awayTeam,
                        HomeTeam = homeTeam,
                        InjuredPlayers = injuredPlayersList,
                        IsBlowout = isBlowout,
                        IsBucketFest = isBucketFest,
                        IsTightD = isTightD,
                        IsClutch = isClutch,
                        IsDuel = isDuel,
                        IsSpecialPerformance = isSpecialPerformance,
                        IsHotGame = isHotGame,
                    });
                }

            return finalGamesList;
        }

        private static async Task<Dictionary<string, StandingsResponse.Standing>> InitStandingsDict()
        {
            var standingsDict = new Dictionary<string, StandingsResponse.Standing>();
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api-nba-v1.p.rapidapi.com/standings/standard/2021"),
                Headers =
                {
                    { "x-rapidapi-key", "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df" },
                    { "x-rapidapi-host", "api-nba-v1.p.rapidapi.com" },
                },
            };
            using var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            if (!response.IsSuccessStatusCode)
                return standingsDict;
            var root = await response.Content.ReadFromJsonAsync<StandingsResponse.Rootobject>();
            var standings = root?.api.standings;
            if (standings != null)
            {
                foreach (var standing in standings)
                {
                    standingsDict[standing.teamId] = standing;
                }
            }

            return standingsDict;
        }

        private static async Task<(bool isSpecialPerformance, bool isDuel, List<string> injuredPlayersList)>
            GetPlayerStatsData(string gameId, string homeTeamId, string awayTeamId)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/" + gameId),
                Headers =
                {
                    { "x-rapidapi-key", "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df" },
                    { "x-rapidapi-host", "api-nba-v1.p.rapidapi.com" },
                },
            };
            using var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            if (!response.IsSuccessStatusCode)
                return (false, false, new List<string>());
            var root = await response.Content.ReadFromJsonAsync<PlayerGameStatsResponse.Rootobject>();
            var players = root?.api.statistics;

            var isDuel = false;
            var isSpecialPerformance = false;
            var injuredPlayers = new List<string>();

            if (players != null)
            {
                (isSpecialPerformance, isDuel) = GetSpecialPerofrmances(players);
                injuredPlayers = GetInjuredPlayers(players, homeTeamId, awayTeamId);
            }

            return (isSpecialPerformance, isDuel, injuredPlayers);
        }

        private static async Task<int> GetMarginAfter3(string gameId)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api-nba-v1.p.rapidapi.com/gameDetails/" + gameId),
                Headers =
                {
                    { "x-rapidapi-key", "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df" },
                    { "x-rapidapi-host", "api-nba-v1.p.rapidapi.com" },
                },
            };
            using var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            if (!response.IsSuccessStatusCode)
                return -1;
            var root = await response.Content.ReadFromJsonAsync<GamesDetailsResponse.Rootobject>();
            var game = root?.api.game[0];

            try
            {
                var homeTeamLineScore = game?.hTeam.score.linescore;
                var homeTeamScoreAfter3 = int.Parse(homeTeamLineScore[0]) + int.Parse(homeTeamLineScore[1]) +
                                          int.Parse(homeTeamLineScore[2]);

                var awayTeamLineScore = game?.vTeam.score.linescore;
                var awayTeamScoreAfter3 = int.Parse(awayTeamLineScore[0]) + int.Parse(awayTeamLineScore[1]) +
                                          int.Parse(awayTeamLineScore[2]);
                return Math.Abs(homeTeamScoreAfter3 - awayTeamScoreAfter3);

            }
            catch
            {
                return 0;
            }

        }

        private static async Task<GamesResponse.Game[]> GetInitialGamesList(string date)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api-nba-v1.p.rapidapi.com/games/date/" + date),
                Headers =
                {
                    { "x-rapidapi-key", "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df" },
                    { "x-rapidapi-host", "api-nba-v1.p.rapidapi.com" },
                },
            };
            using var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            if (!response.IsSuccessStatusCode)
                return null;
            var root = await response.Content.ReadFromJsonAsync<GamesResponse.Rootobject>();
            var games = root?.api.games;
            return games;
        }

        private static List<string> GetInjuredPlayers(PlayerGameStatsResponse.Statistic[] players, string homeTeamId, string awayTeamId)
        {
            var injuredPlayers = new List<string>();
            var stars = players.Where(player => StarsDict.ContainsKey(player.playerId))
                .Select(player => player.playerId).ToList();
            var expectedStars = TeamStarsDict[homeTeamId].Concat(TeamStarsDict[awayTeamId]).ToList();

            foreach (var player in players)
            {
                if (stars.Contains(player.playerId))
                {
                    if(player.min == ""  || !int.TryParse(player.min.Substring(0, 2), out var minutesPlayed))
                        continue;
                    if (minutesPlayed <= 15)
                        injuredPlayers.Add(StarsDict[player.playerId]);
                    expectedStars.Remove(player.playerId);
                }
            }
            // If an injured star wasn't signed up for the game he will not appear at all
            if (expectedStars.Any())
            {
                foreach (var expectedStar in expectedStars)
                {
                    injuredPlayers.Add(StarsDict[expectedStar]);
                }
            }
            return injuredPlayers;
        }

        private static (bool isSpecialPerformance, bool isDuel) GetSpecialPerofrmances(
            PlayerGameStatsResponse.Statistic[] players)
        {
            var isDuel = false;
            var isSpecialPerformance = false;
            var specialPerformersTeamsCounter = 0;
            var firstSpecialPerformerTeamId = string.Empty;
            foreach (var player in players)
            {
                PlayerStats playerStats;
                try
                {
                    playerStats = new PlayerStats()
                    {
                        Points = int.Parse(player.points),
                        Rebounds = int.Parse(player.totReb),
                        Assists = int.Parse(player.assists),
                        Blocks = int.Parse(player.blocks),
                        Steals = int.Parse(player.steals),
                        TeamId = player.teamId
                    };
                }
                catch
                {
                    continue;
                }

                if (IsSpecialPerformance(playerStats))
                {
                    specialPerformersTeamsCounter++;

                    if (firstSpecialPerformerTeamId == string.Empty)
                        firstSpecialPerformerTeamId = playerStats.TeamId;

                    if (specialPerformersTeamsCounter == 1)
                        isSpecialPerformance = true;

                    else if (specialPerformersTeamsCounter > 1)
                    {
                        if (playerStats.TeamId != firstSpecialPerformerTeamId)
                        {
                            isDuel = true;
                            isSpecialPerformance = false;
                            break;
                        }
                    }
                }
            }

            return (isSpecialPerformance, isDuel);
        }

        private static bool IsSpecialPerformance(PlayerStats playerStats)
        {
            return (playerStats.Points >= 40)
                   || playerStats.Points >= 30 && playerStats.Rebounds >= 10 && playerStats.Assists >= 10
                   || playerStats.Points >= 25 && playerStats.Rebounds >= 10 &&
                   (playerStats.Blocks >= 10 || playerStats.Steals >= 10)
                   || playerStats.Points >= 25 && playerStats.Assists >= 10 &&
                   (playerStats.Blocks >= 10 || playerStats.Steals >= 10)
                   || playerStats.Points >= 10 && playerStats.Rebounds >= 10 && playerStats.Assists >= 10 &&
                   (playerStats.Blocks >= 10 || playerStats.Steals >= 10)
                   || playerStats.Points >= 20 && playerStats.Assists >= 15;
        }

        private static bool IsBlowout(int homeTeamScore, int awayTeamScore, int marginAfter3)
        {
            return marginAfter3 >= 15 && Math.Abs(homeTeamScore - awayTeamScore) >= 10;
        }

        private static bool IsHotGame(Team homeTeam, Team awayTeam)
        {
            if (!int.TryParse(homeTeam.Standing.streak, out var homeStreak) ||
                !int.TryParse(awayTeam.Standing.streak, out var awayStreak))
                return false;
            return homeStreak >= 8 || awayStreak >= 8;
        }

        private static bool IsClutch(int homeTeamScore, int awayTeamScore, bool overtime)
        {
            var finalMargin = Math.Abs(awayTeamScore - homeTeamScore);
            return overtime || finalMargin <= 5;
        }

        private static bool IsHighScore(int homeTeamScore, int awayTeamScore)
        {
            return homeTeamScore >= 120 && awayTeamScore >= 120;
        }

        private static bool IsLowScore(int homeTeamScore, int awayTeamScore)
        {
            return homeTeamScore <= 95 && awayTeamScore <= 95;
        }
    }
}