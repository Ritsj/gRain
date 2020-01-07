using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace gRain.Models
{
    public class Monster
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("slug")]
        public string Slug { get; set; }

        [BsonElement("name")]
        [JsonProperty("Name")]
        public string MonsterName { get; set; }

        [BsonElement("size")]
        public string Size { get; set; }

        [BsonElement("type")]
        public string Type { get; set; }

        [BsonElement("subtype")]
        public string[] Subtype { get; set; }

        [BsonElement("group")]
        public string Group { get; set; }

        [BsonElement("alignment")]
        public string Alignment { get; set; }

        [BsonElement("armor_class")]
        public int ArmorClass { get; set; }

        [BsonElement("armor_desc")]
        public string ArmorDesc { get; set; }

        [BsonElement("hit_points")]
        public int HitPoints { get; set; }

        [BsonElement("hit_dice")]
        public string HitDice { get; set; }

        [BsonElement("speed")]
        public Speed Speed { get; set; }

        [BsonElement("perception")]
        public int? Perception { get; set; }

        [BsonElement("skills")]
        public Skills Skills { get; set; }

        [BsonElement("damage_vulnerabilities")]
        public string DamageVulnerabilities { get; set; }

        [BsonElement("damage_resistances")]
        public string DamageResistances { get; set; }

        [BsonElement("damage_immunities")]
        public string DamageImmunities { get; set; }

        [BsonElement("condition_immunities")]
        public string ConditionImmunities { get; set; }

        [BsonElement("senses")]
        public string Senses { get; set; }

        [BsonElement("languages")]
        public string Languages { get; set; }

        [BsonElement("challenge_rating")]
        public int ChallengeRating { get; set; }

        [BsonElement("actions")]
        public IEnumerable<Actions> Actions { get; set; }

        [BsonElement("reactions")]
        public IEnumerable<Reactions> Reactions { get; set; }

        [BsonElement("legendary_desc")]
        public string LegendaryDesc { get; set; }

        [BsonElement("legendary_actions")]
        public IEnumerable<LegendaryActions> LegendaryActions { get; set; }

        [BsonElement("special_abilities")]
        public IEnumerable<SpecialAbilities> SpecialAbilities { get; set; }

        [BsonElement("document__slug")]
        public string DocumentSlug { get; set; }

        [BsonElement("document__title")]
        public string DocumentTitle { get; set; }

        [BsonElement("document__license_url")]
        public string DocumentLicenseUrl { get; set; }
        [BsonElement("xp")]
        public int Xp { get; set; }

        [BsonElement("stats")]
        public Stats Stats { get; set; }

        [BsonElement("saves")]
        public Saves Saves { get; set; }
    }
    public class Speed
    {
        
        [BsonElement("burrow")]
        public int Burrow { get; set; }

        [BsonElement("climb")]
        public int Climb { get; set; }

        [BsonElement("fly")]
        public int Fly { get; set; }

        [BsonElement("hover")]
        public Boolean CanHoover { get; set; }

        [BsonElement("lightwalking")]
        public int Lightwalking { get; set; }

        [BsonElement("notes")]
        public string Notes { get; set; }

        [BsonElement("swim")]
        public int Swim { get; set; }

        [BsonElement("walk")]
        public int Walk { get; set; }

    }

    [BsonIgnoreExtraElements]
    public class Skills
    {
        [BsonElement("acrobatics")]
        public int Acrobatics { get; set; }

        [BsonElement("animal_handling")]
        public int AnimalHandling { get; set; }

        [BsonElement("arcana")]
        public int Arcana { get; set; }

        [BsonElement("athletics")]
        public int Athletics { get; set; }

        [BsonElement("deception")]
        public int Deception { get; set; }

        [BsonElement("history")]
        public int History { get; set; }

        [BsonElement("insight")]
        public int Insight { get; set; }

        [BsonElement("intimidation")]
        public int Intimidation { get; set; }

        [BsonElement("investigation")]
        public int Investigation { get; set; }

        [BsonElement("medicine")]
        public int Medicine { get; set; }

        [BsonElement("nature")]
        public int Nature { get; set; }

        [BsonElement("perception")]
        public int Perception { get; set; }

        [BsonElement("performance")]
        public int Performance { get; set; }

        [BsonElement("persuasion")]
        public int Persuasion { get; set; }

        [BsonElement("religion")]
        public int Religion { get; set; }

        [BsonElement("sleight_of_hand")]
        public int SleightOfHand { get; set; }

        [BsonElement("stealth")]
        public int Stealth { get; set; }

        [BsonElement("survival")]
        public int Survival { get; set; }
    }
    [BsonIgnoreExtraElements]
    public class Actions
    {
        [BsonElement("attack_bonus")]
        public int AttackBonus { get; set; }

        [BsonElement("damage_dice")]
        public string DamageDice { get; set; }

        [BsonElement("desc")]
        public string Desc { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class Reactions
    {
        [BsonElement("desc")]
        public string Desc { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class LegendaryActions
    {
        [BsonElement("desc")]
        public string Desc { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }


    [BsonIgnoreExtraElements]
    public class SpecialAbilities
    {
        [BsonElement("desc")]
        public string Desc { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class Stats
    {
        [BsonElement("str")]
        public int Str { get; set; }

        [BsonElement("dex")]
        public int Dex { get; set; }

        [BsonElement("con")]
        public int Con { get; set; }

        [BsonElement("int")]
        public int Int { get; set; }

        [BsonElement("wis")]
        public int Wis { get; set; }

        [BsonElement("cha")]
        public int Cha { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class Saves
    {
        [BsonElement("str")]
        public int? Str { get; set; }

        [BsonElement("dex")]
        public int? Dex { get; set; }

        [BsonElement("con")]
        public int? Con { get; set; }

        [BsonElement("int")]
        public int? Int { get; set; }

        [BsonElement("wis")]
        public int? Wis { get; set; }

        [BsonElement("cha")]
        public int? Cha { get; set; }
    }
}
