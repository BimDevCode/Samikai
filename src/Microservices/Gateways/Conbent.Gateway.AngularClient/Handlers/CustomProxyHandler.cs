using Hangfire;
using StackExchange.Redis;

namespace Conbent.Gateway.AngularClient.Handlers;
public class CustomProxyHandler(IConnectionMultiplexer redisConnection, ILogger<CustomProxyHandler> logger)
    : HttpMessageHandler
{
    private readonly IConnectionMultiplexer _redisConnection = redisConnection ?? throw new ArgumentNullException(nameof(redisConnection));
    private readonly ILogger<CustomProxyHandler> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        try
        {
            BackgroundJob.Enqueue(() => RateLimitJob(request.RequestUri!.ToString()));

            var httpClient = new HttpClient();
            var response = await httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing request: {RequestUri}", request.RequestUri);
            throw;
        }
    }

    public async Task RateLimitJob(string requestUri)
    {
        var cacheKey = "ratelimit:" + requestUri;
        var cache = _redisConnection.GetDatabase();

        var count = await cache.StringIncrementAsync(cacheKey);
        if (count == 1)
        {
            await cache.KeyExpireAsync(cacheKey, TimeSpan.FromMinutes(1)); // Reset count after 1 minute
        }
        else if (count > 10)
        {
            _logger.LogWarning("Rate limit exceeded for: {RequestUri}", requestUri);
        }
    }
}
