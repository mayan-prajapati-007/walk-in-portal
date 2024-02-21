using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Venue
{
    [Required]
    public string Line1 { get; set; } = "";

    [Required]
    public string Line2 { get; set; } = "";

    [Required]
    public string Landmark { get; set; } = "";

    [Required]
    public string City { get; set; } = "";

    [Required]
    public string Pincode { get; set; } = "";

    [Required]
    public string Phone { get; set; } = "";
}
