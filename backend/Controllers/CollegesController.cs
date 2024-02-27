using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollegesController : ControllerBase
{

    [HttpGet]
    public IActionResult GetAllColleges([FromServices] MySqlDataSource db)
    {
        var colleges = new CollegeService(db).GetCollegesAsync().Result;
        if (colleges == null)
        {
            ModelState.AddModelError("Colleges", "Colleges not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(colleges);
    }

}