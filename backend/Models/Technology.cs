using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Technology
{
    public int TechnologyId { get; set; }

    [Required]
    public string? TechnologyName { get; set; }
}
