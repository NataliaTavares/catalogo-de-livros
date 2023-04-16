using API_Catalogo.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetLivrosAsync();

        Task<Livro> InsertLivroAsync(Livro livro);

        Task<Livro> GetLivroAsync(int id);

        Task<Livro> UpdateLivroAsync(Livro livro);

        Task<Livro> DeleteLivroAsync(int id);

    }
}
