using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class ApplicationInfo : Application
{
    [Required]
    public string PreRequisites { get; set; } = "";

    [Required]
    public List<TimeSlot> TimeSlots { get; set; } = [];

    [Required]
    public Venue Venue { get; set; } = new Venue();
}
