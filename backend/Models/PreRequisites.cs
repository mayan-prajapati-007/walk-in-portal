using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class PreRequisites
{
    [Required]
    public string GeneralInstruction { get; set; } = "";

    [Required]
    public string ExamInstruction { get; set; } = "";

    [Required]
    public string MinSysReqs { get; set; } = "";

    [Required]
    public string ApplicationProcess { get; set; } = "";
}
