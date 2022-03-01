using System;
using System.Collections.Generic;
using System.Text;

namespace DateFetcher.Data_Model.Response_JSON_Models.StandingsResponse
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
        public Standing[] standings { get; set; }
    }

    public class Standing
    {
        public string teamId { get; set; }
        public string win { get; set; }
        public string loss { get; set; }
        public string streak { get; set; }
    }

    public class Conference
    {
        public string name { get; set; }
        public string rank { get; set; }
        public string win { get; set; }
        public string loss { get; set; }
    }

    public class Division
    {
        public string name { get; set; }
        public string rank { get; set; }
        public string win { get; set; }
        public string loss { get; set; }
        public string GamesBehind { get; set; }
    }
}
