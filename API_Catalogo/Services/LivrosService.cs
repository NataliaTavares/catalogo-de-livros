using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Livro;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
        public class LivrosService : ILivrosService
        {


            private readonly ILivroRepository repository;
            private readonly IMapper mapper;


            public LivrosService(ILivroRepository repository, IMapper mapper)
            {
                this.repository = repository;
                this.mapper = mapper;
            }



            public async Task<IEnumerable<LivroView>> GetLivrosAsync()
            {
                return mapper.Map<IEnumerable<Livro>, IEnumerable<LivroView>>(await repository.GetLivrosAsync());
            }


            public async Task<LivroView> InsertLivroAsync(NovoLivro novoLivro)
            {
                var livro = mapper.Map<Livro>(novoLivro);
                return mapper.Map<LivroView>(await repository.InsertLivroAsync(livro));
            }


        }
}
