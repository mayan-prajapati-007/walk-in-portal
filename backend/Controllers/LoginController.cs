using Backend.Filters;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{

    [HttpPost]
    [LoginFilter]
    public IActionResult GetShirtById([FromServices] MySqlDataSource db,[FromBody] User user)
    {
        User? userData = new LoginService(db).Login(user).Result;
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
}