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

        try {
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
            return [.. timeSlots];
        } catch (Exception e) {
            Console.WriteLine(e.Message);
            return null;
        }

    }

}