using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace gRain.Models
{
    public class CharacterXpDTO
    {
        [BsonElement("level")]
        public int Level { get; set; }

        [BsonElement("difficulty")]
        public Difficulty Difficulty { get; set; }

        [BsonElement("adjusted_XP_day")]
        public int AdjustedXpDay { get; set; }
    }

    public class CharacterXp
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("level")]
        public int Level { get; set; }

        [BsonElement("difficulty")]
        public Difficulty Difficulty { get; set; }

        [BsonElement("adjusted_XP_day")]
        public int AdjustedXpDay { get; set; }
    }

    public partial class Difficulty
    {
        [BsonElement("easy")]
        public int Easy { get; set; }

        [BsonElement("medium")]
        public int Medium { get; set; }

        [BsonElement("hard")]
        public int Hard { get; set; }

        [BsonElement("deadly")]
        public int Deadly { get; set; }
    }
}