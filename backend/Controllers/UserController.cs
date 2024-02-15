using Backend.Filters;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    [HttpPost("login")]
    [LoginFilter]
    public IActionResult Login([FromServices] MySqlDataSource db,[FromBody] User user)
    {
        User? userData = new UserService(db).Login(user).Result;
        if (userData == null)
        {
            ModelState.AddModelError("User", "User not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(userData);
    }

    [HttpPost("register")]
    [RegisterFilter]
    public IActionResult Register([FromServices] MySqlDataSource db, [FromBody] UserInfo user)
    {
        UserInfo? userData = new UserService(db).Register(user).Result;
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

}