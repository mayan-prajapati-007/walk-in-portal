using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Application
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = "";

    [Required]
    public string StartDate { get; set; } = "";

    [Required]
    public string EndDate { get; set; } = "";

    [Required]
    public string ExpiryDate { get; set; } = "";

    [Required]
    public string Location { get; set; } = "";

    [Required]
    public virtual List<ApplicationJobRole> JobRoles { get; set; } = [];
}
