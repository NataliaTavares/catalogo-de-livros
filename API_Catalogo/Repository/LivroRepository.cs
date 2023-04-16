using API_Catalogo.Models;
using API_Catalogo.Services;
using Catalogo.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task<Livro> GetLivroAsync(int id)
        {
            return await context.Livros
                .Include(p => p.Autores)
                .Include(p => p.Genero)
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id);
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

        public async Task<Livro> UpdateLivroAsync(Livro livro)
        {
            var livroConsultado = await context.Livros
                                    .Include(p => p.Autores)
                                    .Include(p => p.Genero)
                                    .SingleOrDefaultAsync(p => p.Id == livro.Id);
            if (livroConsultado == null)
            {
                return null;
            }
            context.Entry(livroConsultado).CurrentValues.SetValues(livro);
            await UpdateLivroAutores(livro, livroConsultado);
            await UpdateLivroGenero(livro, livroConsultado);
            await context.SaveChangesAsync();
            return livroConsultado;
        }

        private async Task UpdateLivroGenero(Livro livro, Livro livroConsultado)
        {
            livroConsultado.Genero.Clear();
            foreach (var genero in livro.Genero)
            {
                var generoConsultado = await context.Generos.FindAsync(genero.Id);
                livroConsultado.Genero.Add(generoConsultado);
            }
        }

        private async Task UpdateLivroAutores(Livro livro, Livro livroConsultado)
        {
            livroConsultado.Autores.Clear();
            foreach (var autor in livro.Autores)
            {
                var autorConsultado = await context.Autores.FindAsync(autor.Id);
                livroConsultado.Autores.Add(autorConsultado);
            }
        }

        public async Task<Livro> DeleteLivroAsync(int id)
        {
            var livroConsultado = await context.Livros.FindAsync(id);
            if (livroConsultado == null)
            {
                return null;
            }
            var livroRemovido = context.Livros.Remove(livroConsultado);
            await context.SaveChangesAsync();
            return livroRemovido.Entity;
        }

    }
}
