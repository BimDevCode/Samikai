using Conbent.Gateway.AngularClient.Handlers;
using Hangfire;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http.Extensions;
using StackExchange.Redis;

namespace Conbent.Gateway.AngularClient.Middlewares;

public class RateLimitMiddleware(IConnectionMultiplexer redisConnection, ILogger<CustomProxyHandler> logger, RequestDelegate next, IConnectionMultiplexer redis)
{
    private const int MaxRequests = 100; // Maximum 100 requests per minute
    private const string RateLimitString = "ratelimit:"; // Maximum 100 requests per minute
    private static readonly TimeSpan WindowSize = TimeSpan.FromMinutes(5);

    public async Task Invoke(HttpContext context)
    {
        var ipAddress = context.Connection.RemoteIpAddress!.ToString();
        var requestUri = context.Request.GetDisplayUrl();
        var key = RateLimitString + ipAddress + requestUri;
        // Construct Redis key for rate limiting
        var returnString = BackgroundJob.Enqueue(() => RateLimitJob(requestUri));

        // Perform atomic operations to implement sliding window rate limiter
        await next(context);
    }

    public async Task RateLimitJob(string requestUri)
    {
        var cacheKey = RateLimitString + requestUri;
        var db = redisConnection.GetDatabase();
        
        var  entriesCount = await db.StringIncrementAsync(cacheKey);

        // Check if request count exceeds the limit
        if (entriesCount < MaxRequests)
        {
            var transaction = db.CreateTransaction();
            await transaction.KeyExpireAsync(cacheKey, TimeSpan.FromMinutes(1)); // Reset count after 1 minute
            await transaction.ExecuteAsync();
            return; 
        }
        //context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        //await context.Response.WriteAsync("Rate limit exceeded.");
    }
}