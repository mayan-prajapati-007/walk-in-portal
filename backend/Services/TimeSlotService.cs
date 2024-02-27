using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services;

public interface ITimeSlotService
{
    Task<TimeSlot[]?> GetTimeSlotsByApplicationIdAsync(int id);
}

public class TimeSlotService(MySqlDataSource database) : ITimeSlotService
{
    private readonly MySqlDataSource _database = database;

    public async Task<TimeSlot[]?> GetTimeSlotsByApplicationIdAsync(int id)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var procedure = "get_time_slots_by_application_id";

        var command = new MySqlCommand(procedure, connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        command.Parameters.AddWithValue("@id", id);

        try
        {
            var reader = await command.ExecuteReaderAsync();
            var timeSlots = new List<TimeSlot>();
            while (await reader.ReadAsync())
            {
                var timeSlot = new TimeSlot
                {
                    Id = reader.GetInt32("id"),
                    StartTime = reader.GetTimeSpan("start_time").ToString(),
                    EndTime = reader.GetTimeSpan("end_time").ToString()
                };
                timeSlots.Add(timeSlot);
            }
            await reader.CloseAsync();
            await connection.CloseAsync();
            return [.. timeSlots];
        }
        catch
        {
            return null;
        }

    }

    public async Task<TimeSlot?> GetTimeSlotByIdAsync(int id)
    {
        MySqlConnection connection = await _database.OpenConnectionAsync();

        var query = "SELECT * FROM time_slots WHERE id = @id";

        var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@id", id);

        var reader = await command.ExecuteReaderAsync();

        TimeSlot timeSlot = new();

        if (await reader.ReadAsync())
        {
            timeSlot.Id = reader.GetInt32("id");
            timeSlot.StartTime = reader.GetTimeSpan("start_time").ToString();
            timeSlot.EndTime = reader.GetTimeSpan("end_time").ToString();
        };

        await reader.CloseAsync();

        await connection.CloseAsync();
        return timeSlot == new TimeSlot() ? null : timeSlot;
    }

}