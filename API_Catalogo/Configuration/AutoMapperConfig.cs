using API_Catalogo.Mapping;
using APICatalogo.Mapeamento;
using Microsoft.Extensions.DependencyInjection;


namespace API_Catalogo.Configuration
{
    public static class AutoMapperConfig
    {
        public static void AddAutoMapperConfiguration(this IServiceCollection services)
        {
            services.AddAutoMapper(
                typeof(NovoLivroMappingProfile));
        }
    }
}
