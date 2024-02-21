using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface IStreamService
{
    Task<StreamModel[]?> GetStreamsAsync();
}

public class StreamService(MySqlDataSource database) : IStreamService
{
    private readonly MySqlDataSource _database = database;

    public async Task<StreamModel[]?> GetStreamsAsync()
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_all_streams";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var streams = new List<StreamModel>();
            while (await reader.ReadAsync())
            {
                var stream = new StreamModel
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name")
                };
                streams.Add(stream);
            }
            return [.. streams];
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }

}