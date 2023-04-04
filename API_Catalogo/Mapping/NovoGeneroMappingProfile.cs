using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Generos;
using API_Catalogo.Models.ModelView.Livro;
using AutoMapper;


namespace APICatalogo.Mapeamento
{
    public class NovoGeneroMappingProfile: Profile
    {
        public NovoGeneroMappingProfile()
        {
            CreateMap<NovoGenero, Generos>();
            CreateMap<Generos, GeneroView>();
            CreateMap<Livro, ReferenciaLivro>().ReverseMap();
            CreateMap<Livro, LivroViewNome>().ReverseMap();
            CreateMap<Livro, NovoLivro>().ReverseMap();
            CreateMap<AlteraGenero, Generos>().ReverseMap();


        }
    }
}
