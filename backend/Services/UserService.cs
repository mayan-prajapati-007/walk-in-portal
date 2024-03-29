using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface IUserService
{
    Task<User?> GetUserByEmailAsync(string email);
    Task<UserInfo?> CreateUserAsync(UserInfo user);
}

public class UserService(MySqlDataSource database) : IUserService
{
    private readonly MySqlDataSource _database = database;

    public async Task<int> GetUserIdByEmailAsync(string email)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var query = "SELECT id FROM users WHERE email = @email";

        var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@email", email);

        var reader = await command.ExecuteReaderAsync();

        int id = -1;

        if (await reader.ReadAsync())
        {
            id = reader.GetInt32("id");
        }

        await reader.CloseAsync();
        await connection.CloseAsync();

        return id;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_user_by_email";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        command.Parameters.AddWithValue("@email", email);

        var reader = await command.ExecuteReaderAsync();

        User user = new();
        if (await reader.ReadAsync())
        {
            user.Id = reader.GetInt32("id");
            user.Email = reader.GetString("email");
            user.Password = reader.GetString("password");
            user.Salt = reader.GetString("salt");
            user.Role = reader.GetInt32("role");
        };

        await reader.CloseAsync();

        await connection.CloseAsync();
        return user == new User() ? null : user;
    }

    public async Task<UserInfo?> CreateUserAsync(UserInfo user)
    {

        if (user.Email != null && GetUserByEmailAsync(user.Email).Result != null)
        {
            return null;
        }

        MySqlConnection connection = await _database.OpenConnectionAsync();

        MySqlTransaction transaction = await connection.BeginTransactionAsync();

        var procedure = "insert_user_details";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure,
            Transaction = transaction
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

        BindService.BindRegisterParams(command, user);

        try
        {
            await command.ExecuteNonQueryAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            return null;
        }

        var userId = (int?)command.Parameters["@userId"].Value;

        if (userId != null)
        {
            if (user.JobRoles != null)
            {
                try
                {
                    await InsertJobRolesAsync(userId.Value, user.JobRoles, command);
                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    return null;
                }
                finally {
                    await connection.CloseAsync();
                }
            }
            user.Id = userId.Value;
            return user;
        }

        return null;
    }

    private static async Task InsertJobRolesAsync(int userId, int[] jobRolesIds, MySqlCommand command)
    {
        var jobRoleProcedure = "insert_user_preferes_job_roles";
        command.CommandText = jobRoleProcedure;
        command.Parameters.RemoveAt("@userId");
        command.Parameters.AddWithValue("@userId", userId);
        foreach (var jobRoleId in jobRolesIds)
        {
            command.Parameters.AddWithValue("@jobRoleId", jobRoleId);
            await command.ExecuteNonQueryAsync();
            command.Parameters.RemoveAt("@jobRoleId");
        }
    }
}