using gRain.Models;
using System;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using FastMember;

namespace gRain.Services
{
    public class EncounterService
    {
        private readonly IMongoCollection<CharacterXp> _characterXp;
        private readonly IMongoCollection<Monster> _monsters;

        public EncounterService(IGrainDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _characterXp = database.GetCollection<CharacterXp>(settings.CharacterXpCollectionName);
            _monsters = database.GetCollection<Monster>(settings.MonstersCollectionName);
        }

        public async Task<EncounterValue> GetValue(EncounterDTO encounterDTO)
        {
				List<int> playerLevels = encounterDTO.Level.ToList();
				playerLevels.Sort();
				List<int> distinctLevels = playerLevels.Distinct().ToList();

            var returnedData = await _characterXp.Aggregate()
                    .Match(characterXp => distinctLevels.Contains(characterXp.Level))
                    .Group(
                        x => BsonNull.Value,
                        g => new EncounterValue
                        {
                            Level = g.Select(x => x.Level),
                            EncounterXpEasy = g.Select(x => x.Difficulty.Easy),
                            EncounterXpMedium = g.Select(x => x.Difficulty.Medium),
                            EncounterXpHard = g.Select(x => x.Difficulty.Hard),
                            EncounterXpDeadly = g.Select(x => x.Difficulty.Deadly),
                            XpDay = g.Select(x => x.AdjustedXpDay)
                        })
                    .SingleAsync();
				
				int[] Level = new int[playerLevels.Count];
				int[] EncounterXpEasy = new int[playerLevels.Count];
				int[] EncounterXpMedium = new int[playerLevels.Count];
				int[] EncounterXpHard = new int[playerLevels.Count];
				int[] EncounterXpDeadly = new int[playerLevels.Count];
				int[] XpDay = new int[playerLevels.Count];

				int i = 0;
			foreach (var playerLevel in playerLevels)
				{
					int index = Array.IndexOf(returnedData.Level.ToArray(), playerLevel);
					Level[i] = returnedData.Level.ToArray()[index];
					EncounterXpEasy[i] = returnedData.EncounterXpEasy.ToArray()[index];
					EncounterXpMedium[i] = returnedData.EncounterXpMedium.ToArray()[index];
					EncounterXpHard[i] = returnedData.EncounterXpHard.ToArray()[index];
					EncounterXpDeadly[i] = returnedData.EncounterXpDeadly.ToArray()[index];
					XpDay[i] = returnedData.EncounterXpDeadly.ToArray()[index];
					i++;
			}

			EncounterValue returnValue = new EncounterValue
			{
				Level = Level.AsEnumerable(),
				EncounterXpEasy = EncounterXpEasy.AsEnumerable(),
				EncounterXpMedium = EncounterXpMedium.AsEnumerable(),
				EncounterXpHard = EncounterXpHard.AsEnumerable(),
				EncounterXpDeadly = EncounterXpDeadly.AsEnumerable(),
				XpDay = XpDay.AsEnumerable()
			};

			return returnValue;
        }

        public async Task<List<EncounterMonsterDTO>> GetMonsters(EncounterDTO encounterDTO)
        {
            var result = _monsters.Aggregate()
                .Match(monster => monster.Xp <= encounterDTO.EncounterBudget 
                    && monster.ChallengeRating <= encounterDTO.Level.Max())
                .Project<EncounterMonsterDTO>(Builders<Monster>.Projection
                .Include(monster => monster.Id)
                .Include(monster => monster.MonsterName)
                .Include(monster => monster.Type)
                .Include(monster => monster.ChallengeRating)
                .Include(monster => monster.Xp))
                .ToListAsync();

            return await result;
        }
    }
}
