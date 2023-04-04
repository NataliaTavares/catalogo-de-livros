using API_Catalogo.Models;
using API_Catalogo.Services;
using Catalogo.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Repositorio
{
    public class GenerosRepository: IGenerosRepository
    {
        private readonly AppDbContexto context;


        public GenerosRepository(AppDbContexto context)
        {
            this.context = context;
        }


        public async Task<IEnumerable<Generos>> GetGenerosAsync()
        {
            return await context.Generos
              .Include(p => p.Livro)
              .AsNoTracking().ToListAsync();
        }

        public async Task<Generos> GetGeneroAsync(int id)
        {
            return await context.Generos
                .Include(p => p.Livro)
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Generos> InsertGeneroAsync(Generos genero)
        {

            await context.Generos.AddAsync(genero);
            await context.SaveChangesAsync();
            return genero;
        }

        public async Task<bool> ExisteAsync(int id)
        {
            return await context.Generos.AnyAsync(p => p.Id == id);
        }

        public async Task<Generos> UpdateGeneroAsync(Generos genero)
        {
            var generoConsultado = await context.Generos
                                    //.Include(p => p.Generos)
                                    .SingleOrDefaultAsync(p => p.Id == genero.Id);
            if (generoConsultado == null)
            {
                return null;
            }
            context.Entry(generoConsultado).CurrentValues.SetValues(genero);
            await context.SaveChangesAsync();
            return generoConsultado;
        }

    }
}
