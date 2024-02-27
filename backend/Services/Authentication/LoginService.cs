using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services.Authentication;

public interface ILoginService
{
    Task<string?> LoginAsync(User user);
    Task<string?> GetTokenAsync(int userId);
    Task InsertTokenAsync(string token, int userId);
}

public class LoginService(MySqlDataSource database, IConfiguration configuration) : ILoginService
{
    private readonly MySqlDataSource _database = database;
    private readonly IConfiguration _configuration = configuration;

    public async Task<string?> LoginAsync(User user)
    {
        if (user.Email == null || user.Password == null)
        {
            return null;
        }

        var existingUser = new UserService(_database).GetUserByEmailAsync(user.Email).Result;
        if (existingUser == null || existingUser.Salt == null)
        {
            return null;
        }
        if(existingUser.Role != user.Role)
        {
            return null;
        }
        var hashedPassword = PasswordHasher.ComputeHash(user.Password, existingUser.Salt);
        if (existingUser.Password != hashedPassword)
        {
            return null;
        }
        var token = GetTokenAsync(existingUser.Id).Result;
        if (token != null)
        {
            return token;
        }
        token = TokenGenerator.GenerateToken(_configuration, existingUser);
        await InsertTokenAsync(token, existingUser.Id);
        return token;
    }

    public async Task<string?> GetTokenAsync(int userId)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();
        var query = @"SELECT token FROM user_auth_tokens WHERE user_id=@userId";
        var command = new MySqlCommand(query, connection)
        {
            CommandType = CommandType.Text
        };
        command.Parameters.AddWithValue("@userId", userId);
        var reader = await command.ExecuteReaderAsync();
        string? token = null;
        if (await reader.ReadAsync())
        {
            token = reader.GetString("token");
        }
        await reader.CloseAsync();
        await connection.CloseAsync();
        return token;
    }

    public async Task InsertTokenAsync(string token, int userId)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();
        var procedure = "insert_user_token";
        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };
        command.Parameters.AddWithValue("@userToken", token);
        command.Parameters.AddWithValue("@userId", userId);
        await command.ExecuteNonQueryAsync();
        await connection.CloseAsync();
    }
}