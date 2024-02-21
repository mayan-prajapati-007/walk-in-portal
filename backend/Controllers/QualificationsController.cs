using Backend.Filters;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QualificationsController : ControllerBase
{

    [HttpGet]
    public IActionResult GetAllQualifications([FromServices] MySqlDataSource db)
    {
        var qualifications = new QualificationService(db).GetQualificationsAsync().Result;
        if (qualifications == null)
        {
            ModelState.AddModelError("Qualifications", "Qualifications not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(qualifications);
    }

}