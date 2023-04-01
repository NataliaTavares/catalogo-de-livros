using API_Catalogo.Models.ModelView.Autores;
using API_Catalogo.Models.ModelView.Erro;
using API_Catalogo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(AutorView), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await manager.GetAutorAsync(id));
        }

        [HttpPost]
        [ProducesResponseType(typeof(AutorView), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(NovoAutor autor)
        {
            var autorInserido = await manager.InsertAutorAsync(autor);
            return CreatedAtAction(nameof(Get), new { id = autorInserido.Id }, autorInserido);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(AutorView), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Put(AlteraAutor autor)
        {
            var autorAtualizado = await manager.UpdateAutorAsync(autor);
            if (autorAtualizado == null)
            {
                return NotFound();
            }
            return Ok(autorAtualizado);
        }


    }
}
