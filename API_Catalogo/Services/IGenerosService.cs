using API_Catalogo.Models.ModelView.Generos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface IGenerosService
    {
        
        Task<IEnumerable<GeneroView>> GetGenerosAsync();

        Task<GeneroView> InsertGeneroAsync(NovoGenero novoGenero);

        Task<GeneroView> GetGeneroAsync(int id);

        Task<GeneroView> UpdateGeneroAsync(AlteraGenero alteraGenero);
    }
}

