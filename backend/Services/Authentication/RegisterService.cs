using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services.Authentication;

public interface IRegisterService
{
    Task<UserInfo?> RegisterAsync(UserInfo user);
}

public class RegisterService(MySqlDataSource database)
{
    private readonly MySqlDataSource _database = database;

    public async Task<UserInfo?> RegisterAsync(UserInfo user)
    {
        var newUser = await new UserService(_database).CreateUserAsync(user);
        return newUser;
    }
}