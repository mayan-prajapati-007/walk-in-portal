using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class StreamModel
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = "";
}
