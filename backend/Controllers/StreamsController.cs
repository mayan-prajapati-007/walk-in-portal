using Backend.Filters;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StreamsController : ControllerBase
{

    [HttpGet]
    public IActionResult GetAllStreams([FromServices] MySqlDataSource db)
    {
        var streams = new StreamService(db).GetStreamsAsync().Result;
        if (streams == null)
        {
            ModelState.AddModelError("Streams", "Streams not found.");
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            return NotFound(problemDetails);
        }
        return Ok(streams);
    }

}