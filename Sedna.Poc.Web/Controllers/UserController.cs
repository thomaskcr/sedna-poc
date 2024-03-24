using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sedna.Poc.Data.Entities;
using Sedna.Poc.Lib.Services;
using Sedna.Poc.Data.Models;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using dotenv.net;

namespace Sedna.Poc.Web.Controllers;

[ApiController, Route("api/v1/users")]
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

    [HttpPost("check-user")]
    public async Task<IActionResult> CheckUser([FromBody] UserCheckModel model)
    {
        var (exists, statusCode, user) = await _userService.CheckUserExistsAsync(model.Email, model.Pass);
    
        if (!exists)
        {
            return NotFound();
        }

        var token = GenerateJwtToken(model);

        return Ok(new {
        jwtToken = token, 
        payload = new { 
            email = user.Email,
            given_name = user.FirstName,
            family_name = user.LastName
        }
        });
    }

    private string GenerateJwtToken(UserCheckModel model)
    {
        DotEnv.Load();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("placeholder_value_for_jwt_secret_environment_variable");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("email", model.Email.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}