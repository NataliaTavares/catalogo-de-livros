using API_Catalogo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface IGenerosRepository
    {
        Task<IEnumerable<Generos>> GetGenerosAsync();

        Task<Generos> InsertGeneroAsync(Generos genero);

        Task<Generos> GetGeneroAsync(int id);

        Task<Generos> UpdateGeneroAsync(Generos genero);

        Task<Generos> DeleteGeneroAsync(int id);

    }
}
