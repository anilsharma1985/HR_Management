using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;


namespace hr_api.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<RequestLoggingMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            var request = FormatRequest(context.Request);
            _logger.LogTrace($@"Request interceptor - User: {context.User.Identity.Name} Origin IP: {context.Connection.RemoteIpAddress.ToString()} Request: {request}");
            _logger.LogInformation($@"Request interceptor - User: {context.User.Identity.Name} Origin IP: {context.Connection.RemoteIpAddress.ToString()} Request: {request}");
            await _next(context);
        }


        private string FormatRequest(HttpRequest request)
        {
            return $"{request.Scheme} {request.Host}{request.Path} {request.QueryString}";
        }
    }
}
