using gRain.Models;
using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gRain.Services
{
    public class CharacterXpService
    {
        private readonly IMongoCollection<CharacterXp> _characterXp;

        public CharacterXpService(IGrainDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _characterXp = database.GetCollection<CharacterXp>(settings.CharacterXpCollectionName);
        }

        public List<CharacterXp> GetAll() =>
            _characterXp.Find(characterXp => true).ToList();

        public async Task<CharacterXpDTO> Get(CharacterXpDTO characterXpDTO)
        {
            var result = _characterXp.Find(characterXp => characterXp.Level == characterXpDTO.Level)
                .Project<CharacterXpDTO>(Builders<CharacterXp>.Projection
                .Exclude(characterXp => characterXp.Id))
                .FirstOrDefaultAsync();

            return await result;
        }
    }
}
