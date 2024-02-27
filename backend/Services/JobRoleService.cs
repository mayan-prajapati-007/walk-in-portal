using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface IJobRoleService
{
    Task<ApplicationJobRole[]?> GetJobRolesByApplicationIdAsync(int id);
    Task<JobRole[]?> GetJobRolesAsync();
}

public class JobRoleService(MySqlDataSource database) : IJobRoleService
{
    private readonly MySqlDataSource _database = database;

    public async Task<JobRole[]?> GetJobRolesAsync()
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_all_job_roles";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var jobRoles = new List<JobRole>();
            while (await reader.ReadAsync())
            {
                var jobRole = new JobRole
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name")
                };
                jobRoles.Add(jobRole);
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return [.. jobRoles];
        }
        catch
        {
            return null;
        }
    }

    public async Task<ApplicationJobRole[]?> GetJobRolesByApplicationIdAsync(int id)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_job_roles_by_application_id";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        command.Parameters.AddWithValue("@id", id);

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var jobRoles = new List<ApplicationJobRole>();
            while (await reader.ReadAsync())
            {
                var jobRole = new ApplicationJobRole
                {
                    JobRoleId = reader.GetInt32("job_role_id"),
                    JobTitle = reader.GetString("name"),
                    GrossCompensationPackage = reader.GetInt32("gross_compensation_package"),
                    RoleDescription = reader.GetString("role_description"),
                    RoleRequirements = reader.GetString("role_requirements")
                };
                jobRoles.Add(jobRole);
            }
            return [.. jobRoles];
        }
        catch
        {
            return null;
        }

    }

}