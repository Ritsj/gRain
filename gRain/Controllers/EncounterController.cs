using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gRain.Services;
using gRain.Models;
using gRain.Filters;

namespace gRain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncounterController : ControllerBase
    {
        private readonly EncounterService _encounterService;

        public EncounterController(EncounterService encounterService)
        {
            _encounterService = encounterService;
        }

        [HttpGet]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<ActionResult<EncounterValue>> GetValue([FromQuery]EncounterDTO encounterDTO)
        {
            return await _encounterService.GetValue(encounterDTO);
        }

        [HttpGet("{monsters}")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<ActionResult<List<EncounterMonsterDTO>>> GetMonsters([FromQuery]EncounterDTO encounterDTO)
        {
            return await _encounterService.GetMonsters(encounterDTO);
        }
    }
}
