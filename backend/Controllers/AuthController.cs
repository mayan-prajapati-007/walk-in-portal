using Backend.Filters;
using Backend.Models;
using Backend.Services;
using Backend.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{

    [HttpPost("login")]
    [LoginFilter]
    public IActionResult Login([FromServices] MySqlDataSource db,[FromServices] IConfiguration configuration ,[FromBody] User user)
    {
        string? token = new LoginService(db, configuration).Login(user).Result;
        if (token == null)
        {
            ModelState.AddModelError("User", "User not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(token);
    }

    [HttpPost("register")]
    [RegisterFilter]
    public IActionResult Register([FromServices] MySqlDataSource db, [FromBody] UserInfo user)
    {
        UserInfo? userData = new RegisterService(db).Register(user).Result;
        if (userData == null)
        {
            ModelState.AddModelError("User", "User Data provided is invalid");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(userData);
    }

    [HttpGet("logout")]
    public IActionResult Logout([FromServices] MySqlDataSource db,[FromServices] IConfiguration configuration, [FromHeader] string token)
    {
        if (TokenGenerator.IsValidToken(configuration, token))
        {
            return Ok();
        }
        ModelState.AddModelError("Token", "Token is invalid");
        var problemDetails = new ValidationProblemDetails(ModelState)
        {
            Status = StatusCodes.Status404NotFound
        };
        return NotFound(problemDetails);
    }

}