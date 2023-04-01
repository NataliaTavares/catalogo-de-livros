using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Autores;
using API_Catalogo.Models.ModelView.Generos;
using API_Catalogo.Models.ModelView.Livro;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Mapping
{
    public class NovoLivroMappingProfile : Profile
    {
        public NovoLivroMappingProfile()
        {
            CreateMap<NovoLivro, Livro>();
            CreateMap<Livro, LivroView>();
            CreateMap<Autores, ReferenciaAutor>().ReverseMap();
            CreateMap<Autores, AutorView>().ReverseMap();
            CreateMap<Autores, NovoAutor>().ReverseMap();
            CreateMap<Generos, ReferenciaGenero>().ReverseMap();
            CreateMap<Generos, GeneroView>().ReverseMap();
            CreateMap<Generos, NovoGenero>().ReverseMap();

        }
    }
}
