using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Filters;

public class TokenFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);

        string? token = (string?)context.ActionArguments["token"];
        if (token == null)
        {
            context.ModelState.AddModelError("Token", "Token is null.");
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status400BadRequest
            };
            context.Result = new BadRequestObjectResult(problemDetails);
        } else {
            if (TokenGenerator.IsValidToken(context.HttpContext.RequestServices.GetRequiredService<IConfiguration>(), token) == false)
            {
                context.ModelState.AddModelError("Token", "Token is invalid.");
                var problemDetails = new ValidationProblemDetails(context.ModelState)
                {
                    Status = StatusCodes.Status400BadRequest
                };
                context.Result = new BadRequestObjectResult(problemDetails);
            }
        }
    }
}
