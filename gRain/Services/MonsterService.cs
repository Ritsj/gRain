﻿using gRain.Models;
using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gRain.Services
{
    public class MonsterService
    {
        private readonly IMongoCollection<Monster> _monsters;

        public MonsterService(IGrainDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _monsters = database.GetCollection<Monster>(settings.MonstersCollectionName);
        }

        public List<Monster> Get() =>
            _monsters.Find(monster => true).ToList();

        public Monster Get(string id) =>
            _monsters.Find(monster => monster.Id == id).FirstOrDefault();


        public Monster Create(Monster monster)
        {
            _monsters.InsertOne(monster);
            return monster;
        }

        public void Update(string id, Monster monsterIn) =>
            _monsters.ReplaceOne(monster => monster.Id == id, monsterIn);

        public void Remove(Monster monsterIn) =>
            _monsters.DeleteOne(monster => monster.Id == monsterIn.Id);

        public void Remove(string id) =>
            _monsters.DeleteOne(monster => monster.Id == id);
    }
}
