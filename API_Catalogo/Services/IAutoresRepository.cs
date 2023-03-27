using API_Catalogo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface IAutoresRepository
    {
        Task<IEnumerable<Autores>> GetAutoresAsync();

        Task<Autores> InsertAutorAsync(Autores autor);


    }
}
