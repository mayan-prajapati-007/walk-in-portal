using Backend.Filters;
using Backend.Models;
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

    [HttpGet("{id}")]
    [TokenFilter]
    public IActionResult GetApplicationById([FromServices] MySqlDataSource db,[FromHeader] string token , int id)
    {
        var application = new ApplicationService(db).GetApplicationInfoByIdAsync(id).Result;
        if (application == null)
        {
            ModelState.AddModelError("Application", "Application not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(application);
    }

    [HttpPost("apply")]
    [TokenFilter]
    public IActionResult Apply([FromServices] MySqlDataSource db, [FromHeader] string token, [FromBody] UserApplication application)
    {
        var userApplicationData = new ApplicationService(db).ApplyForApplicationAsync(application).Result;
        if(userApplicationData == null)
        {
            ModelState.AddModelError("Application", "Application not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(userApplicationData);
    }

}