using System.Collections.Generic;
using Amazon.DynamoDBv2.DataModel;

namespace DateFetcher.Data_Model
{
    [DynamoDBTable("Games")]
    public class Game
    {
        [DynamoDBHashKey]
        public string Date { get; set; }
        [DynamoDBRangeKey]
        public string GameId { get; set; }
        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        public bool IsBlowout { get; set; }
        public bool IsBucketFest { get; set; }
        public bool IsClutch { get; set; }
        public List<string> InjuredPlayers { get; set; }
        public bool IsTightD { get; set; }
        public bool IsSpecialPerformance { get; set; }
        public bool IsDuel { get; set; }
        public bool IsHotGame { get; set; }
    }
}
