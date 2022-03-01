using System;
using System.Collections.Generic;
using System.Text;

namespace DateFetcher.Data_Model.Response_JSON_Models.GamesResponse
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
        public Game[] games { get; set; }

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
        public string currentPeriod { get; set; }
        public string halftime { get; set; }
        public string EndOfPeriod { get; set; }
        public string seasonStage { get; set; }
        public string statusShortGame { get; set; }
        public string statusGame { get; set; }
        public Vteam vTeam { get; set; }
        public Hteam hTeam { get; set; }
    }

    public class Vteam
    {
        public string teamId { get; set; }
        public string shortName { get; set; }
        public string fullName { get; set; }
        public string nickName { get; set; }
        public string logo { get; set; }
        public Score score { get; set; }
    }

    public class Score
    {
        public string points { get; set; }
    }

    public class Hteam
    {
        public string teamId { get; set; }
        public string shortName { get; set; }
        public string fullName { get; set; }
        public string nickName { get; set; }
        public string logo { get; set; }
        public Score score { get; set; }
    }

}
