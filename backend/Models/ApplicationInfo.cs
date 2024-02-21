using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class ApplicationInfo : Application
{
    [Required]
    public PreRequisites PreRequisites { get; set; } = new PreRequisites();

    [Required]
    public List<TimeSlot> TimeSlots { get; set; } = [];

    [Required]
    public Venue Venue { get; set; } = new Venue();
}
