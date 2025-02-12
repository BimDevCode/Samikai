using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Conbent.Article.API.Helpers;

public class HealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var healthCheckResultHealthy = true;
        return Task.FromResult(healthCheckResultHealthy ? HealthCheckResult.Healthy("The check indicates a healthy result.") : HealthCheckResult.Unhealthy("The check indicates an unhealthy result."));
    }
}