using Microsoft.Extensions.Configuration;
using System.Linq;

namespace hr_api.Extensions
{
    public static class ConfigurationExtensions
    {
        public static IConfigurationBuilder AddFirstAvailableJsonFile(this IConfigurationBuilder builder, params string[] filePaths)
        {
            var fileProvider = builder.GetFileProvider();
            var firstAvailableFile = filePaths.FirstOrDefault(path => fileProvider.GetFileInfo(path).Exists);

            return firstAvailableFile != null
                ? builder.AddJsonFile(firstAvailableFile, optional: true, reloadOnChange: true)
                : builder;
        }
    }
}
