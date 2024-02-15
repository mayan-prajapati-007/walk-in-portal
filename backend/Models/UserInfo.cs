using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class UserInfo : User
{
    public string? ProfileImage { get; set; }

    [Required]
    public string? FirstName { get; set; }

    [Required]
    public string? LastName { get; set; }

    public string? Phone { get; set; }

    [Required]
    public int[]? JobRoles { get; set; }

    public string? Resume { get; set; }

    public string? Portfolio { get; set; }

    public string? RefEmpName { get; set; }

    [Required]
    public bool EmailSubscription { get; set; }

    [Required]
    public int CollegeId { get; set; }

    public string? CollegeName { get; set; }

    public string? CollegeLocation { get; set; }

    [Required]
    public int QualificationId { get; set; }

    [Required]
    public int StreamId { get; set; }

    [Required]
    [Range(1900, 2100, ErrorMessage = "Year of passing must be between 1900 and 2100.")]
    public int YearOfPassing { get; set; }

    [Required]
    [Range(0, 100, ErrorMessage = "Aggregate percentage must be between 0 and 100.")]
    public int AggregatePercentage { get; set; }

    [Required]
    public int ApplicantType { get; set; }

    public string? AppliedEarlier { get; set; }

    public int? YearsOfExperience { get; set; }

    public int? CurrentCtc { get; set; }

    public int? ExpectedCtc { get; set; }

    public DateOnly? NoticePeriodEndDate { get; set; }

    public int? NoticePeriodDuration { get; set; }

    public int[]? MainExpertTechnologyIds { get; set; }

    public int[]? MainKnownTechnologyIds { get; set; }

    public Technology[]? OtherExpertTechnologies { get; set; }

    public Technology[]? OtherKnownTechnologies { get; set; }
}