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
                    JobRoles = []
                };
                applications.Add(application);
            }

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
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }

}