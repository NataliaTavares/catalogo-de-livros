using API_Catalogo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetLivrosAsync();

        Task<Livro> InsertLivroAsync(Livro livro);


    }
}
