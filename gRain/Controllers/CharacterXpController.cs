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
    public class CharacterXpController : ControllerBase
    {
        private readonly CharacterXpService _characterXpService;

        public CharacterXpController(CharacterXpService characterXpService)
        {
            _characterXpService = characterXpService;
        }

        [HttpGet]
        public ActionResult<List<CharacterXp>> GetAll() =>
            _characterXpService.GetAll();
     
        [HttpGet]
        public async Task<ActionResult<CharacterXpDTO>> Get([FromQuery]CharacterXpDTO characterXpDTO)
        {
            return await _characterXpService.Get(characterXpDTO);
        }
    }
}