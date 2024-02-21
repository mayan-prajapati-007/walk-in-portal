using Backend.Filters;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobRolesController : ControllerBase
{

    [HttpGet]
    public IActionResult GetAllJobRoles([FromServices] MySqlDataSource db)
    {
        var jobRoles = new JobRoleService(db).GetJobRolesAsync().Result;
        if (jobRoles == null)
        {
            ModelState.AddModelError("JobRoles", "JobRoles not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(jobRoles);
    }

}