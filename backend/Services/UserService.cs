using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public class UserService(MySqlDataSource database)
{
    private readonly MySqlDataSource _database = database;

    public async Task<User?> Login(User user)
    {
        if (user.Email == null || user.Password == null)
        {
            return null;
        }

        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "user_login";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        BindLoginParams(command, user.Email);

        var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var existingUser = new User
            {
                Id = reader.GetInt32("id"),
                Email = reader.GetString("email"),
                Password = reader.GetString("password"),
                Salt = reader.GetString("salt"),
                Role = reader.GetInt32("role")
            };
            var hashedPassword = PasswordHasher.ComputeHash(user.Password, existingUser.Salt);
            if (existingUser.Password != hashedPassword)
            {
                return null;
            }
            return existingUser;
        }

        return null;
    }

    public async Task<UserInfo?> Register(UserInfo user)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "user_registration";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };



        if (user.ApplicantType == 1)
        {
            user.YearsOfExperience = null;
            user.CurrentCtc = null;
            user.ExpectedCtc = null;
            user.NoticePeriodEndDate = null;
            user.NoticePeriodDuration = null;
        }

        user.Salt = PasswordHasher.GenerateSalt();
        if (user.Password == null)
        {
            return null;
        }
        user.Password = PasswordHasher.ComputeHash(user.Password, user.Salt);

        BindRegisterParams(command, user);

        await command.ExecuteNonQueryAsync();

        var userId = (int?)command.Parameters["@userId"].Value;

        if (userId != null)
        {
            if (user.JobRoles != null)
                await InsertJobRoles(userId.Value, user.JobRoles);
            List<int> otherTechIds = [];
            List<int> mainTechIds = [];
            if (user.MainExpertTechnologyIds != null)
                foreach (var technology in user.MainExpertTechnologyIds)
                    mainTechIds.Add(technology);
            if (user.MainKnownTechnologyIds != null)
                foreach (var technology in user.MainKnownTechnologyIds)
                    mainTechIds.Add(technology);
            if (user.OtherExpertTechnologies != null)
                await InsertOtherTechnologies(user.OtherExpertTechnologies, otherTechIds);
            if (user.OtherKnownTechnologies != null)
                await InsertOtherTechnologies(user.OtherKnownTechnologies, otherTechIds);
            user.Id = userId.Value;
            user.Password = null;
            user.Salt = null;
            return user;
        }

        return null;
    }

    private async Task InsertJobRoles(int userId, int[] jobRoles)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();
        var jobRoleProcedure = "insert_user_preferes_job_roles";
        var command = new MySqlCommand(jobRoleProcedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };
        command.Parameters.AddWithValue("@userId", userId);
        foreach (var jobRoleId in jobRoles)
        {
            command.Parameters.AddWithValue("@jobRoleId", jobRoleId);
            await command.ExecuteNonQueryAsync();
            command.Parameters.RemoveAt("@jobRoleId");
        }
    }

    private async Task InsertOtherTechnologies(Technology[] technologies, List<int> otherTechnologiesIds)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();
        var otherTechnologiesProcedure = "insert_other_technologies";
        var command = new MySqlCommand(otherTechnologiesProcedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };
        foreach (var technology in technologies)
        {
            command.Parameters.AddWithValue("@techName", technology.TechnologyName);
            command.Parameters.Add(new MySqlParameter("@technologyId", MySqlDbType.Int32)
            {
                Direction = ParameterDirection.Output
            });
            await command.ExecuteNonQueryAsync();
            command.Parameters.RemoveAt("@techName");
            var otherTechnologyId = (int?)command.Parameters["@technologyId"].Value;
            if (otherTechnologyId != null)
            {
                otherTechnologiesIds.Add(otherTechnologyId.Value);
            }
            command.Parameters.RemoveAt("@technologyId");
        }
    }

    private static void BindLoginParams(MySqlCommand cmd, string email)
    {
        cmd.Parameters.AddWithValue("@email", email);
    }

    private static void BindRegisterParams(MySqlCommand cmd, UserInfo user)
    {
        cmd.Parameters.AddWithValue("@userEmail", user.Email);
        cmd.Parameters.AddWithValue("@userPassword", user.Password);
        cmd.Parameters.AddWithValue("@userSalt", user.Salt);
        cmd.Parameters.AddWithValue("@userRole", user.Role);
        cmd.Parameters.AddWithValue("@profileImage", user.ProfileImage);
        cmd.Parameters.AddWithValue("@firstName", user.FirstName);
        cmd.Parameters.AddWithValue("@lastName", user.LastName);
        cmd.Parameters.AddWithValue("@userPhone", user.Phone);
        cmd.Parameters.AddWithValue("@userResume", user.Resume);
        cmd.Parameters.AddWithValue("@userPortfolio", user.Portfolio);
        cmd.Parameters.AddWithValue("@refEmpName", user.RefEmpName);
        cmd.Parameters.AddWithValue("@emailSubscription", user.EmailSubscription);
        cmd.Parameters.AddWithValue("@collegeId", user.CollegeId);
        cmd.Parameters.AddWithValue("@collegeName", user.CollegeName);
        cmd.Parameters.AddWithValue("@collegeLocation", user.CollegeLocation);
        cmd.Parameters.AddWithValue("@qualificationId", user.QualificationId);
        cmd.Parameters.AddWithValue("@streamId", user.StreamId);
        cmd.Parameters.AddWithValue("@yearOfPassing", user.YearOfPassing);
        cmd.Parameters.AddWithValue("@aggregatePercentage", user.AggregatePercentage);
        cmd.Parameters.AddWithValue("@applicantType", user.ApplicantType);
        cmd.Parameters.AddWithValue("@appliedEarlier", user.AppliedEarlier);
        cmd.Parameters.AddWithValue("@yearsOfExperience", user.YearsOfExperience);
        cmd.Parameters.AddWithValue("@currentCtc", user.CurrentCtc);
        cmd.Parameters.AddWithValue("@expectedCtc", user.ExpectedCtc);
        cmd.Parameters.AddWithValue("@noticePeriodEndDate", user.NoticePeriodEndDate);
        cmd.Parameters.AddWithValue("@noticePeriodDuration", user.NoticePeriodDuration);

        cmd.Parameters.Add(new MySqlParameter("@userId", MySqlDbType.Int32)
        {
            Direction = ParameterDirection.Output
        });
    }
}