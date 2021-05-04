using hr_api.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using System;
using hr_Domain.Helpers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using hr_Service.Interface;
using System.Threading.Tasks;
using hr_Data.Entities;
using Microsoft.IdentityModel.Tokens;
using hr_Data;
using hr_Service;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using hr_api.Middleware;

namespace hr_api
{
    public class Startup
    {
        #region Declarations

        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        #endregion
        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
            // Added Code for environment check - START

            var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddFirstAvailableJsonFile($"appsettings.json", "appsettings.json")
              //.AddAzureKeyVault()
              .AddEnvironmentVariables();

            var config = builder.Build();
            _configuration = config;



            // Added Code for environment check - END
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry();
            services.AddCors();
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // Configure JWT authentication
            AppSettings appSettings = appSettingsSection.Get<AppSettings>();
            byte[] key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        IUserService userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        int userId = int.Parse(context.Principal.Identity.Name);
                        User user = userService.GetById(userId);
                        if (user == null)
                        {
                            // Return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddAuthenticationServices();

            services.AddRepositoryServices();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }
            app.UseRouting();
            app.UseCors(x => x
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();
            //Add our new middleware to the pipeline
            app.UseMiddleware<RequestLoggingMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
