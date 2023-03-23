using API_Catalogo.Models;
using Microsoft.EntityFrameworkCore;


namespace Catalogo.Context
{
    public class AppDbContexto : DbContext
    {

        public AppDbContexto(DbContextOptions<AppDbContexto> options) : base(options)
        {

        }


        public DbSet<Livro> Livros { get; set; }
        public DbSet<Autores> Autores { get; set; }
        public DbSet<Generos> Generos { get; set; }
    }
}
