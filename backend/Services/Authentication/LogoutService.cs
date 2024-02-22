using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services.Authentication;

public interface ILogoutService
{
    Task LogoutAsync(string token);
}

public class LogoutService(MySqlDataSource database) : ILogoutService
{
    private readonly MySqlDataSource _database = database;

    public async Task LogoutAsync(string token)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "delete_token_by_value";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        System.Console.WriteLine(token);
        command.Parameters.AddWithValue("@token", token);

        await command.ExecuteNonQueryAsync();
        Console.WriteLine("Token deleted");
        await connection.CloseAsync();
    }
}