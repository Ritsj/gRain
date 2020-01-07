using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gRain.Services;
using gRain.Models;


namespace gRain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonstersController : ControllerBase
    {
        private readonly MonsterService _monsterService;

        public MonstersController(MonsterService monsterService)
        {
            _monsterService = monsterService;
        }

        [HttpGet]
        public ActionResult<List<Monster>> Get() =>
            _monsterService.Get();

        [HttpGet("{id:length(24)}", Name = "GetMonster")]
        public ActionResult<Monster> GetMonster(String id)
        {
            var monster = _monsterService.Get(id);

            if (monster == null)
            {
                return NotFound();
            }

            return monster;
        }

        [HttpPost]
        public ActionResult<Monster> Create(Monster monster)
        {
            _monsterService.Create(monster);

            return CreatedAtRoute("GetMonster", new { id = monster.Id.ToString() }, monster);

        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Monster monsterIn)
        {
            var monster = _monsterService.Get(id);

            if (monster == null)
            {
                return NotFound();
            }

            _monsterService.Update(id, monsterIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var monster = _monsterService.Get(id);

            if (monster == null)
            {
                return NotFound();
            }

            _monsterService.Remove(monster.Id);

            return NoContent();
        }
    }
}