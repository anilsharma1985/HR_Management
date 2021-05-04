using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace hr_Data
{
    public static class DependencyInjectionConfig
    {
        /// <summary>
        /// Inject Services for Repository
        /// </summary>
        /// <param name="services">Services Collection</param>
        /// <returns>Services Collection</returns>
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
        {
            //services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
