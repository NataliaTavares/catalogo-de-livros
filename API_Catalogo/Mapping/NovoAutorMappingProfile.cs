using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Autores;
using API_Catalogo.Models.ModelView.Livro;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Mapping
{
    public class NovoAutorMappingProfile : Profile
    {
        public NovoAutorMappingProfile()
        {
            CreateMap<NovoAutor, Autores>();
            CreateMap<Autores, AutorView>();
            CreateMap<Livro, ReferenciaLivro>().ReverseMap();
            CreateMap<Livro, LivroViewNome>().ReverseMap();
            CreateMap<Livro, NovoLivro>().ReverseMap();
            CreateMap<AlteraAutor, Autores>().ReverseMap();
        }
        
    }
}
