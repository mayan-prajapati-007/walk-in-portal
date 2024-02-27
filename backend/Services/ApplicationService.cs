using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public class ApplicationService(MySqlDataSource database)
{
    private readonly MySqlDataSource _database = database;

    public async Task<Application[]?> GetAllApplicationsAsync()
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_all_applications";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var applications = new List<Application>();
            while (await reader.ReadAsync())
            {
                var application = new Application
                {
                    Id = reader.GetInt32("id"),
                    Title = reader.GetString("title"),
                    StartDate = reader.GetDateOnly("start_date").ToString(),
                    EndDate = reader.GetDateOnly("end_date").ToString(),
                    ExpiryDate = reader.GetDateOnly("expiry_date").ToString(),
                    Location = reader.GetString("location"),
                    AdditionalInfo = reader["additional_info"] == DBNull.Value ? null : reader.GetString("additional_info"),
                    JobRoles = []
                };
                applications.Add(application);
            }

            await reader.CloseAsync();

            await connection.CloseAsync();

            foreach (var application in applications)
            {
                var jobRoles = await new JobRoleService(_database).GetJobRolesByApplicationIdAsync(application.Id);
                if (jobRoles != null)
                {
                    foreach (var jobRole in jobRoles)
                    {
                        application.JobRoles.Add(jobRole);

                    }
                }
            }

            return [.. applications];
        }
        catch
        {
            return null;
        }
    }

    public async Task<ApplicationInfo?> GetApplicationInfoByIdAsync(int id)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_application_by_id";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        command.Parameters.AddWithValue("@id", id);

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var application = new ApplicationInfo();
            while (await reader.ReadAsync())
            {
                application.Id = reader.GetInt32("id");
                application.Title = reader.GetString("title");
                application.StartDate = reader.GetDateOnly("start_date").ToString();
                application.EndDate = reader.GetDateOnly("end_date").ToString();
                application.ExpiryDate = reader.GetDateOnly("expiry_date").ToString();
                application.Location = reader.GetString("location");
                application.AdditionalInfo = reader["additional_info"] == DBNull.Value ? null : reader.GetString("additional_info");
                application.PreRequisites = new PreRequisites
                {
                    GeneralInstruction = reader.GetString("general_instructions"),
                    ExamInstruction = reader.GetString("exam_instructions"),
                    MinSysReqs = reader.GetString("min_sys_reqs"),
                    ApplicationProcess = reader.GetString("application_process")
                };
                application.Venue = new Venue
                {
                    Line1 = reader.GetString("line1"),
                    Line2 = reader.GetString("line2"),
                    Landmark = reader.GetString("landmark"),
                    City = reader.GetString("city"),
                    Pincode = reader.GetString("pincode"),
                    Phone = reader.GetString("phone")
                };
            }

            await reader.CloseAsync();
            await connection.CloseAsync();

            if (application.Id == 0)
            {
                return null;
            }
            var jobRoles = await new JobRoleService(_database).GetJobRolesByApplicationIdAsync(application.Id);
            if (jobRoles != null)
            {
                foreach (var jobRole in jobRoles)
                {
                    application.JobRoles.Add(jobRole);
                }
            }

            var timeSlots = await new TimeSlotService(_database).GetTimeSlotsByApplicationIdAsync(application.Id);
            if (timeSlots != null)
            {
                foreach (var timeSlot in timeSlots)
                {
                    application.TimeSlots.Add(timeSlot);
                }
            }

            return application;
        }
        catch
        {
            return null;
        }
    }

    public async Task<UserApplicationData?> ApplyForApplicationAsync(UserApplication userApplication)
    {
        var userId = await new UserService(_database).GetUserIdByEmailAsync(userApplication.Email);

        if (userId == -1)
        {
            return null;
        }

        var userApplicationData = new UserApplicationData();

        MySqlConnection connection = await _database.OpenConnectionAsync();

        MySqlTransaction transaction = await connection.BeginTransactionAsync();

        var procedure = "user_apply";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure,
            Transaction = transaction
        };

        command.Parameters.AddWithValue("@userId", userId);
        command.Parameters.AddWithValue("@applicationId", userApplication.ApplicationId);
        command.Parameters.AddWithValue("@timeSlotId", userApplication.TimeSlotId);
        command.Parameters.AddWithValue("@applicationDate", userApplication.Date);
        command.Parameters.AddWithValue("@updatedResume", userApplication.Resume);

        try
        {
            await command.ExecuteNonQueryAsync();
            await InsertJobRolesAsync(userApplication.JobRoleIds, command);
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            return null;
        }
        finally
        {
            await connection.CloseAsync();
        }
        userApplicationData.UserId = userId;
        userApplicationData.ApplicationId = userApplication.ApplicationId;

        var time_slot = await new TimeSlotService(_database).GetTimeSlotByIdAsync(userApplication.TimeSlotId);
        userApplicationData.TimeSlot = time_slot ?? new TimeSlot();

        userApplicationData.Date = userApplication.Date;
        userApplicationData.Resume = userApplication.Resume;
        return userApplicationData;
    }

    private static async Task InsertJobRolesAsync(List<int> jobRolesIds, MySqlCommand command)
    {
        var jobRoleProcedure = "insert_application_preference_job_roles";
        command.CommandText = jobRoleProcedure;
        command.Parameters.RemoveAt("@timeSlotId");
        command.Parameters.RemoveAt("@applicationDate");
        command.Parameters.RemoveAt("@updatedResume");
        foreach (var jobRoleId in jobRolesIds)
        {
            command.Parameters.AddWithValue("@jobRoleId", jobRoleId);
            await command.ExecuteNonQueryAsync();
            command.Parameters.RemoveAt("@jobRoleId");
        }
    }
}