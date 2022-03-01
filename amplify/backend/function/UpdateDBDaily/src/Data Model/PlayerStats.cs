using System;
using System.Collections.Generic;
using System.Text;

namespace DateFetcher.Data_Model
{
    public class PlayerStats
    {
        public int Points { get; set; }
        public int Rebounds { get; set; }
        public int Assists { get; set; }
        public int Steals { get; set; }
        public int Blocks { get; set; }
        public int Minutes { get; set; }
        public string TeamId { get; set; }
        public string PlayerId { get; set; }
    }
}
