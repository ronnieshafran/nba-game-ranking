using System;
using System.Collections.Generic;
using System.Text;

namespace DateFetcher.Data_Model.Response_JSON_Models.GameDetailsResponse
{

    public class Rootobject
    {
        public Api api { get; set; }
    }

    public class Api
    {
        public int status { get; set; }
        public string message { get; set; }
        public int results { get; set; }
        public string[] filters { get; set; }
        public Game[] game { get; set; }
    }

    public class Game
    {
        public string seasonYear { get; set; }
        public string league { get; set; }
        public string gameId { get; set; }
        public string startTimeUTC { get; set; }
        public string endTimeUTC { get; set; }
        public string arena { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string clock { get; set; }
        public string gameDuration { get; set; }
        public string timesTied { get; set; }
        public string leadChanges { get; set; }
        public string currentPeriod { get; set; }
        public string halftime { get; set; }
        public string EndOfPeriod { get; set; }
        public string seasonStage { get; set; }
        public string statusShortGame { get; set; }
        public string statusGame { get; set; }
        public Vteam vTeam { get; set; }
        public Hteam hTeam { get; set; }
        public Official[] officials { get; set; }
    }

    public class Vteam
    {
        public string fullName { get; set; }
        public string teamId { get; set; }
        public string nickname { get; set; }
        public string logo { get; set; }
        public string shortName { get; set; }
        public string allStar { get; set; }
        public string nbaFranchise { get; set; }
        public Score score { get; set; }
        public Leader[] leaders { get; set; }
    }

    public class Score
    {
        public string win { get; set; }
        public string loss { get; set; }
        public string seriesWin { get; set; }
        public string seriesLoss { get; set; }
        public string[] linescore { get; set; }
        public string points { get; set; }
    }

    public class Leader
    {
        public string points { get; set; }
        public string playerId { get; set; }
        public string name { get; set; }
        public string rebounds { get; set; }
        public string assists { get; set; }
    }

    public class Hteam
    {
        public string fullName { get; set; }
        public string teamId { get; set; }
        public string nickname { get; set; }
        public string logo { get; set; }
        public string shortName { get; set; }
        public string allStar { get; set; }
        public string nbaFranchise { get; set; }
        public Score1 score { get; set; }
        public Leader1[] leaders { get; set; }
    }

    public class Score1
    {
        public string win { get; set; }
        public string loss { get; set; }
        public string seriesWin { get; set; }
        public string seriesLoss { get; set; }
        public string[] linescore { get; set; }
        public string points { get; set; }
    }

    public class Leader1
    {
        public string points { get; set; }
        public string playerId { get; set; }
        public string name { get; set; }
        public string rebounds { get; set; }
        public string assists { get; set; }
    }

    public class Official
    {
        public string name { get; set; }
    }

}
