using System.Data;
using Backend.Models;
using MySqlConnector;

namespace Backend.Services.Authentication;

public class RegisterService(MySqlDataSource database)
{
    private readonly MySqlDataSource _database = database;

    public async Task<UserInfo?> Register(UserInfo user)
    {
        var newUser = await new UserService(_database).CreateUser(user);
        return newUser;
    }
}