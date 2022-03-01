using DateFetcher.Data_Model.Response_JSON_Models.StandingsResponse;

namespace DateFetcher.Data_Model
{
    public class Team
    {
        public string Name { get; set; }
        public string LogoURL { get; set; }
        public string TeamId { get; set; }
        public Standing Standing { get; set; }
    }
}
