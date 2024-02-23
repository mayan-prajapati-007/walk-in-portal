using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class UserApplication
{
    public string Email { get; set; } = "";

    public int ApplicationId { get; set; }

    public int TimeSlotId { get; set; }

    public string Date { get; set; } = "";

    public string Resume { get; set; } = "";

    public List<int> JobRoleIds { get; set; } = [];
}
