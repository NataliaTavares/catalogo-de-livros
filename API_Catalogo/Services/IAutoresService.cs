using API_Catalogo.Models.ModelView.Autores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface IAutoresService
    {
        Task<AutorView> GetAutorAsync(int id);

        Task<IEnumerable<AutorView>> GetAutoresAsync();

        Task<AutorView> InsertAutorAsync(NovoAutor novoAutor);

        Task<AutorView> UpdateAutorAsync(AlteraAutor alteraAutor);


    }
}
