using API_Catalogo.Models.ModelView.Livro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Models.ModelView.Generos
{
    public class GeneroView
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public ICollection<LivroViewNome> Livro { get; set; }
    }
}
