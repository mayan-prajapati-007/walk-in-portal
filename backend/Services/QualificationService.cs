using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface IQualificationService
{
    Task<Qualification[]?> GetQualificationsAsync();
}

public class QualificationService(MySqlDataSource database) : IQualificationService
{
    private readonly MySqlDataSource _database = database;

    public async Task<Qualification[]?> GetQualificationsAsync()
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_all_qualifications";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var qualifications = new List<Qualification>();
            while (await reader.ReadAsync())
            {
                var qualification = new Qualification
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name")
                };
                qualifications.Add(qualification);
            }
            return [.. qualifications];
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }

}