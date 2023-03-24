using API_Catalogo.Models.ModelView.Erro;
using API_Catalogo.Models.ModelView.Generos;
using API_Catalogo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Catalogo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneroController : ControllerBase
    {

        private readonly IGenerosService manager;


        public GeneroController(IGenerosService manager)
        {
            this.manager = manager;
        }


        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<GeneroView>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get()
        {
            return Ok(await manager.GetGenerosAsync());
        }


        [HttpPost]
        [ProducesResponseType(typeof(GeneroView), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(NovoGenero genero)
        {
            var generoInserido = await manager.InsertGeneroAsync(genero);
            return CreatedAtAction(nameof(Get), new { id = generoInserido.Id }, generoInserido);
        }




    }
}
