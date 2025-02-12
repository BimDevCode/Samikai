using Microsoft.Extensions.Caching.Distributed;

namespace Conbent.AngularClientGateway.Middlewares;

public class RedisCacheMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IDistributedCache _cache;

    public RedisCacheMiddleware(RequestDelegate next, IDistributedCache cache)
    {
        _next = next;
        _cache = cache;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await _next(context);
        return;
        if (context.Request.Method == "GET")
        {
            var cacheKey = $"ResponseCache-{context.Request.Path}";
            var cachedResponse = await _cache.GetStringAsync(cacheKey);
            if (!string.IsNullOrEmpty(cachedResponse))
            {
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(cachedResponse);
                return;
            }

            var originalBody = context.Response.Body;
            using var memStream = new MemoryStream();
            context.Response.Body = memStream;

            await _next(context);

            memStream.Position = 0;
            var responseBody = await new StreamReader(memStream).ReadToEndAsync();
            await _cache.SetStringAsync(cacheKey, responseBody, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1) // Cache duration
            });

            memStream.Position = 0;
            await memStream.CopyToAsync(originalBody);
            context.Response.Body = originalBody;
        }
        else
        {
            await _next(context);
        }
    }
}