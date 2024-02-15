using System.Security.Cryptography;
using System.Text;

namespace Backend.Services;

public static class PasswordHasher
{
    public static string ComputeHash(string password, string salt)
    {
        var passwordSalt = $"{password}{salt}";
        var byteValue = Encoding.UTF8.GetBytes(passwordSalt);
        var byteHash = SHA256.HashData(byteValue);
        var hash = Convert.ToBase64String(byteHash);
        return hash;
    }

    public static string GenerateSalt()
    {
        using var rng = RandomNumberGenerator.Create();
        var byteSalt = new byte[16];
        rng.GetBytes(byteSalt);
        var salt = Convert.ToBase64String(byteSalt);
        return salt;
    }
}