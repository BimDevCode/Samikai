namespace Conbent.CommonInfrastructure.Infrastructure;
public interface IResponseCacheService
{
    Task CacheResponseAsync(string cacheKey, object? response, TimeSpan timeToLive);
    Task<string> GetCachedResponse(string cacheKey);
}
