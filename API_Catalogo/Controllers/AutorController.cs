using API_Catalogo.Models.ModelView.Autores;
using API_Catalogo.Models.ModelView.Erro;
using API_Catalogo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorController : ControllerBase
    {

        private readonly IAutoresService manager;

        public AutorController(IAutoresService manager)
        {
            this.manager = manager;
        }

 
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AutorView>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get()
        {
            return Ok(await manager.GetAutoresAsync());
        }


        [HttpPost]
        [ProducesResponseType(typeof(AutorView), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(NovoAutor autor)
        {
            var autorInserido = await manager.InsertAutorAsync(autor);
            return CreatedAtAction(nameof(Get), new { id = autorInserido.Id }, autorInserido);
        }


    




    }
}
