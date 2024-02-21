using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class TimeSlot
{
    public int Id { get; set; }

    [Required]
    public string StartTime { get; set; } = "";

    [Required]
    public string EndTime { get; set; } = "";
}
