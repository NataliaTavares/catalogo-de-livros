using API_Catalogo.Models.ModelView.Livro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface ILivrosService
    {

        Task<IEnumerable<LivroView>> GetLivrosAsync();

        Task<LivroView> InsertLivroAsync(NovoLivro novoLivro);

        Task<LivroView> GetLivroAsync(int id);

        Task<LivroView> UpdateLivroAsync(AlteraLivro alteraLivro);
    }
}
