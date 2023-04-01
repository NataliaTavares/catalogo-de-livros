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
    public class AutoresRepository: IAutoresRepository
    {
        private readonly AppDbContexto context;

        public AutoresRepository(AppDbContexto context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Autores>> GetAutoresAsync()
        {
            return await context.Autores
              .Include(p => p.Livro)
              .AsNoTracking().ToListAsync();
        }

        public async Task<Autores> GetAutorAsync(int id)
        {
            return await context.Autores
                .Include(p => p.Livro)
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Autores> InsertAutorAsync(Autores autor)
        {

            await context.Autores.AddAsync(autor);
            await context.SaveChangesAsync();
            return autor;
        }

        public async Task<bool> ExisteAsync(int id)
        {
            return await context.Autores.AnyAsync(p => p.Id == id);
        }

        public async Task<Autores> UpdateAutorAsync(Autores autor)
        {
            var autorConsultado = await context.Autores
                                    .SingleOrDefaultAsync(p => p.Id == autor.Id);
            if (autorConsultado == null)
            {
                return null;
            }
            context.Entry(autorConsultado).CurrentValues.SetValues(autor);
            await context.SaveChangesAsync();
            return autorConsultado;
        }

    }
}
