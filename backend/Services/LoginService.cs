using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public class LoginService(MySqlDataSource database)
{
    private readonly MySqlDataSource _database = database;

    public async Task<User?> Login(User user)
    {
        if (user.Email == null || user.Password == null)
        {
            return null;
        }
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "login";

        using var command = new MySqlCommand(procedure, connection);

        command.CommandType = CommandType.StoredProcedure;
        BindParams(command, user.Email, user.Password);
        
        using var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new User
            {
                Id = reader.GetInt32("id"),
                Email = reader.GetString("email"),
                Password = reader.GetString("password"),
                Role = reader.GetInt32("role")
            };
        }

        return null;
    }

    private static void BindParams(MySqlCommand cmd, string email, string password)
    {
        cmd.Parameters.AddWithValue("@email", email);
        cmd.Parameters.AddWithValue("@password", password);
    }
}