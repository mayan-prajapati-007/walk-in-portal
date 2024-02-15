using System.Text.RegularExpressions;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Filters;

public partial class RegisterFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);

        UserInfo? user = (UserInfo?)context.ActionArguments["user"];
        if (user == null)
        {
            context.ModelState.AddModelError("User", "User is null.");
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status400BadRequest
            };
            context.Result = new BadRequestObjectResult(problemDetails);
        }
        else if (user.Email == null || EmailRegex().IsMatch(user.Email) == false)
        {
            context.ModelState.AddModelError("User", "Email is invalid.");
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status400BadRequest
            };
            context.Result = new BadRequestObjectResult(problemDetails);
        }
        else if (user.Phone == null || PhoneRegex().IsMatch(user.Phone) == false)
        {
            context.ModelState.AddModelError("User", "Phone is invalid.");
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status400BadRequest
            };
            context.Result = new BadRequestObjectResult(problemDetails);
        }
    }

    [GeneratedRegex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
    private static partial Regex EmailRegex();

    [GeneratedRegex(@"^(\d{3}-\d{3}-\d{4})$")]
    private static partial Regex PhoneRegex();
}
