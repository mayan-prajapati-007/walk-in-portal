using Backend.Filters;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{

    [HttpGet]
    [TokenFilter]
    public IActionResult GetAllApplications([FromServices] MySqlDataSource db, [FromHeader] string token)
    {
        var applications = new ApplicationService(db).GetAllApplicationsAsync().Result;
        if (applications == null)
        {
            ModelState.AddModelError("Applications", "Applications not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(applications);
    }

}