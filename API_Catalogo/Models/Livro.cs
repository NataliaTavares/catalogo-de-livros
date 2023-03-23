using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API_Catalogo.Models
{
    public class Livro
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string Nome { get; set; }


        [Required]
        [DataType(DataType.Date)]
        public DateTime Data { get; set; }

        [Required]
        public ICollection<Generos> Genero { get; set; }

        [Required]
        public ICollection<Autores> Autores { get; set; }

        public Livro()
        {
            Autores = new HashSet<Autores>();
        }
    }
}
