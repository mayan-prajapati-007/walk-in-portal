using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class College
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = "";

    [Required]
    public string Location { get; set; } = "";
}
