using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gRain.Models
{
    public class EncounterValue 
    {
        [BsonElement("level")]
        public IEnumerable<int> Level { get; set; }

        [BsonElement("encounter_Xp_easy")]
        public IEnumerable<int> EncounterXpEasy { get; set; }

        [BsonElement("encounter_Xp_medium")]
        public IEnumerable<int> EncounterXpMedium { get; set; }

        [BsonElement("encounter_Xp_hard")]
        public IEnumerable<int> EncounterXpHard { get; set; }

        [BsonElement("encounter_Xp_deadly")]
        public IEnumerable<int> EncounterXpDeadly { get; set; }

        [BsonElement("Xp_day")]
        public IEnumerable<int> XpDay { get; set; }
    }
    public class EncounterDTO
    {
        [Required]
        [BsonElement("level")]
        public IEnumerable<int> Level { get; set; }

        [BsonElement("difficulty")]
        public Difficulty Difficulty { get; set; }

        [BsonElement("encounter_budget")]
        public int EncounterBudget { get; set; }
    }

    public class EncounterMonsterDTO
    {
        [BsonElement("_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
        [BsonElement("challenge_rating")]
        public int ChallengeRating { get; set; }
        [BsonElement("xp")]
        public int Xp { get; set; }

    }

    public partial class Difficulty
    {
        public Tier Tier { get; set; }
    }

    public class Tier
    {
        public string Name { get; set; }
        public int Value { get; set; }
    }

}
