using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using MySqlConnector;

namespace Backend.Services;
public class TokenGenerator()
{
    public static string GenerateToken(IConfiguration configuration, User user)
    {
        if (user.Email == null || user.Role == null)
        {
            return string.Empty;
        }
        List<Claim> claims = [
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, EnumUserRole.GetRole(user.Role.Value).ToString())
        ];
        var staticToken = configuration.GetSection("StaticToken:Token").Value;
        if (staticToken == null)
        {
            return string.Empty;
        }
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(staticToken));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

    public static string GetEmailFromToken(string token)
    {
        try
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var stringClaimValue = securityToken?.Claims.Select(claim => claim.Value).ToArray();
            if (stringClaimValue != null)
            {
                return stringClaimValue[0];
            }
        }
        catch {}
        return string.Empty;
    }
}