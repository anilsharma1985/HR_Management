using AutoMapper;
using hr_Data.Entities;
using hr_Domain.Helpers;
using hr_Domain.users;
using hr_Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hr_api.Controllers
{
    [Authorize]
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Declarations
        private IUserService _userService;
        private readonly AppSettings _appSettings;
        private readonly IActionContextAccessor _accessor;
        private readonly ILogger<UserController> _logger;

        private IMapper _mapper;
        #endregion
        public UserController(
            IUserService userService,
            IOptions<AppSettings> appSettings,
            IActionContextAccessor accessor,
            ILogger<UserController> logger,
            IMapper mapper)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
            _accessor = accessor;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<AuthenticateModel>> GetAll()
        {
            return new[]
            {
            new AuthenticateModel { UsernameOrEmail = "Ana" },
            new AuthenticateModel { UsernameOrEmail = "Felipe" },
            new AuthenticateModel { UsernameOrEmail = "Emillia" }
        };
        }
        [AllowAnonymous]

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            try
            {
                var user = _userService.Authenticate(model.UsernameOrEmail, model.Password);

                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect" });

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                //    // create login history
                UserLoginHistory loginHistory = new UserLoginHistory();
                loginHistory.User = user;
                loginHistory.LoginDate = DateTime.UtcNow;
                loginHistory.RequestOrigin = $@"IP Address: {_accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString()} Host: {_accessor.ActionContext.HttpContext.Request.Host.ToString()}";

                //throw new AppException("Exceptoin aa gayi");
                // return basic user info and authentication token
                return Ok(new
                {
                    Id = user.Id,
                    Username = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Token = tokenString
                });

            }
            catch (AppException ex)
            {
                _logger.LogError(ex, ex.Message, ex.StackTrace);
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] RegisterModel model)
        {
            return Ok(new
            {
                Id = 2,

            });
        }


        [Authorize]
        [HttpPost("saveuser")]
        public ActionResult<string> saveuser([FromBody] RegisterModel model)
        {
            var user = _mapper.Map<User>(model);

            var rng = new Random();
            return "";
        }

    }
}
