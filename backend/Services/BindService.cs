using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public static class BindService {
    public static void BindRegisterParams(MySqlCommand command, UserInfo user)
    {
        command.Parameters.AddWithValue("@userEmail", user.Email);
        command.Parameters.AddWithValue("@userPassword", user.Password);
        command.Parameters.AddWithValue("@userSalt", user.Salt);
        command.Parameters.AddWithValue("@userRole", user.Role);
        command.Parameters.AddWithValue("@profileImage", user.ProfileImage);
        command.Parameters.AddWithValue("@firstName", user.FirstName);
        command.Parameters.AddWithValue("@lastName", user.LastName);
        command.Parameters.AddWithValue("@userPhone", user.Phone);
        command.Parameters.AddWithValue("@userResume", user.Resume);
        command.Parameters.AddWithValue("@userPortfolio", user.Portfolio);
        command.Parameters.AddWithValue("@refEmpName", user.RefEmpName);
        command.Parameters.AddWithValue("@emailSubscription", user.EmailSubscription);
        command.Parameters.AddWithValue("@collegeId", user.CollegeId);
        command.Parameters.AddWithValue("@collegeName", user.CollegeName);
        command.Parameters.AddWithValue("@collegeLocation", user.CollegeLocation);
        command.Parameters.AddWithValue("@qualificationId", user.QualificationId);
        command.Parameters.AddWithValue("@streamId", user.StreamId);
        command.Parameters.AddWithValue("@yearOfPassing", user.YearOfPassing);
        command.Parameters.AddWithValue("@aggregatePercentage", user.AggregatePercentage);
        command.Parameters.AddWithValue("@applicantType", user.ApplicantType);
        command.Parameters.AddWithValue("@appliedEarlier", user.AppliedEarlier);
        command.Parameters.AddWithValue("@knownTechnologies", user.KnownTechnologies);
        command.Parameters.AddWithValue("@expertTechnologies", user.ExpertTechnologies);
        command.Parameters.AddWithValue("@yearsOfExperience", user.YearsOfExperience);
        command.Parameters.AddWithValue("@currentCtc", user.CurrentCtc);
        command.Parameters.AddWithValue("@expectedCtc", user.ExpectedCtc);
        command.Parameters.AddWithValue("@noticePeriodEndDate", user.NoticePeriodEndDate);
        command.Parameters.AddWithValue("@noticePeriodDuration", user.NoticePeriodDuration);

        command.Parameters.Add(new MySqlParameter("@userId", MySqlDbType.Int32)
        {
            Direction = ParameterDirection.Output
        });
    }
}