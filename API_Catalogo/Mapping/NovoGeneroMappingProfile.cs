using API_Catalogo.Models;
using API_Catalogo.Models.ModelView.Generos;
using AutoMapper;


namespace APICatalogo.Mapeamento
{
    public class NovoGeneroMappingProfile: Profile
    {
        public NovoGeneroMappingProfile()
        {
            CreateMap<NovoGenero, Generos>();
            CreateMap<Generos, GeneroView>();


        }
    }
}
