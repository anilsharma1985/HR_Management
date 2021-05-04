using hr_Service.Implementation;
using hr_Service.Interface;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace hr_Service
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection AddAuthenticationServices(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            return services;
        }
    }
}
