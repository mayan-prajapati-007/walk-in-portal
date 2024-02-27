namespace Backend.Models;

public class UserApplicationData
{
    public int UserId { get; set; }

    public int ApplicationId { get; set; }

    public TimeSlot TimeSlot { get; set; } = new TimeSlot();

    public string Date { get; set; } = "";

    public string Resume { get; set; } = "";
}
