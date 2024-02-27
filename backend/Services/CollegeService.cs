using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface ICollegeService
{
    Task<College[]?> GetCollegesAsync();
}

public class CollegeService(MySqlDataSource database) : ICollegeService
{
    private readonly MySqlDataSource _database = database;

    public async Task<College[]?> GetCollegesAsync()
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_all_colleges";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var colleges = new List<College>();
            while (await reader.ReadAsync())
            {
                var college = new College
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name"),
                    Location = reader.GetString("location")
                };
                colleges.Add(college);
            }
            await reader.CloseAsync();

            await connection.CloseAsync();
            return [.. colleges];
        }
        catch
        {
            return null;
        }
    }

}