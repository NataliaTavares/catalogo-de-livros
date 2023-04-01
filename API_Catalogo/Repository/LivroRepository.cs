using API_Catalogo.Models;
using API_Catalogo.Services;
using Catalogo.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Repository
{
    public class LivroRepository : ILivroRepository
    {
        private readonly AppDbContexto context;


        public LivroRepository(AppDbContexto context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Livro>> GetLivrosAsync()
        {
            return await context.Livros
              .Include(p => p.Autores)
              .Include(p => p.Genero)
              .AsNoTracking().ToListAsync();
        }


        public async Task<Livro> InsertLivroAsync(Livro livro)
        {
            await InsertLivroAutores(livro);
            await InsertLivroGenero(livro);
            await context.Livros.AddAsync(livro);
            await context.SaveChangesAsync();
            return livro;
        }

        private async Task InsertLivroGenero(Livro livro)
        {
            var generosConsultados = new List<Generos>();
            foreach (var genero in livro.Genero)
            {
                var generosConsultado = await context.Generos.FindAsync(genero.Id);
                generosConsultados.Add(generosConsultado);
            }
            livro.Genero = generosConsultados;
        }

        private async Task InsertLivroAutores(Livro livro)
        {
            var autoresConsultados = new List<Autores>();
            foreach (var autor in livro.Autores)
            {
                var autoresConsultado = await context.Autores.FindAsync(autor.Id);
                autoresConsultados.Add(autoresConsultado);
            }
            livro.Autores = autoresConsultados;
        }

    
    }
}
