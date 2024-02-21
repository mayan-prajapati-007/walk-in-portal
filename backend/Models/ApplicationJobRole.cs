using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class ApplicationJobRole
{
    public int JobRoleId { get; set; }

    public string JobTitle { get; set; } = "";

    [Required]
    public int GrossCompensationPackage { get; set; }

    [Required]
    public string RoleDescription { get; set; } = "";

    [Required]
    public string RoleRequirements { get; set; } = "";
}
