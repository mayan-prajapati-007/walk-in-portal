using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services.Authentication;

public class LoginService(MySqlDataSource database, IConfiguration configuration)
{
    private readonly MySqlDataSource _database = database;
    private readonly IConfiguration _configuration = configuration;

    public async Task<string?> Login(User user)
    {
        if (user.Email == null || user.Password == null)
        {
            return null;
        }

        var existingUser = new UserService(_database).GetUserByEmail(user.Email).Result;
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
        var token = GetToken(existingUser.Id).Result;
        if (token != null)
        {
            return token;
        }
        token = TokenGenerator.GenerateToken(_configuration, existingUser);
        await InsertToken(token, existingUser.Id);
        return token;
    }

    public async Task<string?> GetToken(int userId)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();
        var query = @"SELECT token FROM user_auth_tokens WHERE user_id=@userId";
        var command = new MySqlCommand(query, connection)
        {
            CommandType = CommandType.Text
        };
        command.Parameters.AddWithValue("@userId", userId);
        var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return reader.GetString("token");
        }
        return null;
    }

    public async Task InsertToken(string token, int userId)
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
    }
}