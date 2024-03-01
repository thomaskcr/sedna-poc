using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sedna.Poc.Data.Entities;
using Sedna.Poc.Lib.Services;

namespace Sedna.Poc.Web.Controllers;

[ApiController, Authorize, Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    
    public UserController(UserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public IActionResult ListUsers()
    {
        try
        {
            return Ok(_userService.ListUsers());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        try
        {
            return _userService.CreateUser(user) switch
            {
                HttpStatusCode.OK => Ok(),
                _ => BadRequest()
            };
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}