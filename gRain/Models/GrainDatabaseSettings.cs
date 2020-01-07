using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gRain.Models
{
    public class GrainDatabaseSettings : IGrainDatabaseSettings
    {
        public string MonstersCollectionName { get; set; }
        public string CharacterXpCollectionName { get; set; }
        public string EncounterValueCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IGrainDatabaseSettings
    {
        string MonstersCollectionName { get; set; }
        string CharacterXpCollectionName { get; set; }
        string EncounterValueCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
