using API_Catalogo.Models.ModelView.Erro;
using API_Catalogo.Models.ModelView.Livro;
using API_Catalogo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Catalogo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivroController : ControllerBase
    {
        private readonly ILivrosService manager;

        public LivroController(ILivrosService manager)
        {
            this.manager = manager;
        }

        
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<LivroView>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get()
        {
            return Ok(await manager.GetLivrosAsync());
        }

       
        [HttpPost]
        [ProducesResponseType(typeof(LivroView), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post(NovoLivro livro)
        {
            var livroInserido = await manager.InsertLivroAsync(livro);
            return CreatedAtAction(nameof(Get), new { id = livroInserido.Id }, livroInserido);
        }

    }
}
