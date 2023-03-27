using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Autores;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public class AutoresService: IAutoresService
    {
        private readonly IAutoresRepository repository;
        private readonly IMapper mapper;


        public AutoresService(IAutoresRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<AutorView>> GetAutoresAsync()
        {
            return mapper.Map<IEnumerable<Autores>, IEnumerable<AutorView>>(await repository.GetAutoresAsync());
        }

        public async Task<AutorView> InsertAutorAsync(NovoAutor novoAutor)
        {
            var autor = mapper.Map<Autores>(novoAutor);
            return mapper.Map<AutorView>(await repository.InsertAutorAsync(autor));
        }


    }
}

