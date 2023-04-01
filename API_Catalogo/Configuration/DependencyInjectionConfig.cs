using API_Catalogo.Repositorio;
using API_Catalogo.Repository;
using API_Catalogo.Services;
using Microsoft.Extensions.DependencyInjection;


namespace API_Catalogo.Configuration
{
    public static class DependencyInjectionConfig
    {

        public static void AddDependencyInjectionConfiguration(this IServiceCollection services)
        {
            services.AddScoped<ILivroRepository, LivroRepository>();
            services.AddScoped<ILivrosService, LivrosService>();
            services.AddScoped<IGenerosRepository, GenerosRepository>();
            services.AddScoped<IAutoresRepository, AutoresRepository>();

        }


    }
}
