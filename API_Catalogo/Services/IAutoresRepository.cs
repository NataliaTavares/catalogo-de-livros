﻿using API_Catalogo.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Catalogo.Services
{
    public interface IAutoresRepository
    {
        Task<IEnumerable<Autores>> GetAutoresAsync();

        Task<Autores> GetAutorAsync(int id);

        Task<Autores> InsertAutorAsync(Autores autor);

        Task<Autores> UpdateAutorAsync(Autores autor);

        Task<Autores> DeleteAutorAsync(int id);

    }
}
