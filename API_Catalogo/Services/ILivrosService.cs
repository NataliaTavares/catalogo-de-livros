using API_Catalogo.Models.ModelView.Livro;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface ILivrosService
    {

        Task<IEnumerable<LivroView>> GetLivrosAsync();

        Task<LivroView> InsertLivroAsync(NovoLivro novoLivro);

        Task<LivroView> GetLivroAsync(int id);

        Task<LivroView> UpdateLivroAsync(AlteraLivro alteraLivro);

        Task DeleteLivroAsync(int id);
    }
}
