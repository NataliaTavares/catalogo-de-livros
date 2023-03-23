using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Models
{
    public class Generos
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        public ICollection<Livro> Livro { get; set; }


        public Generos()
        {
            Livro = new HashSet<Livro>();
        }

    }
}
