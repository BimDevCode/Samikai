
using Conbent.Article.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Conbent.Article.Infrastructure.Context;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.CommonInfrastructure.Errors;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using Conbent.Article.API.Helpers;
using Conbent.Domain.DatabaseModel.Storage;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Http;
using Conbent.Domain.DatabaseModel.Contractors;

namespace Conbent.Article.API.Extensions;

public static class Extensions
{
    private static readonly string[] ConfigureOptions = new[] { "text/plain", "text/html", "application/json" };

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, WebApplicationBuilder builder
        )
    {
        IConfiguration config = builder.Configuration;
        services.AddHealthChecks()
            .AddCheck<HealthCheck>("health_check")
            .AddRedis(
                redisConnectionString: builder.Configuration.GetConnectionString("RedisConnection") ?? throw new InvalidOperationException(),
                name: "redis",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "db", "redis", "database" });

        if (builder.Environment.IsDevelopment())
        {

            services.AddHealthChecksUI(setup =>
            {
                setup
                    .DisableDatabaseMigrations()
                    .AddHealthCheckEndpoint("health_check", "https://localhost:7069/health")
                    .SetEvaluationTimeInSeconds(10)
                    .SetMinimumSecondsBetweenFailureNotifications(30);
            }).AddInMemoryStorage().Services.AddSingleton<IHttpMessageHandlerBuilderFilter, HealthHttpMessageHandlerBuilderFilter>(); ;//Security decreased for test
        }
        else
        {
            services.AddHealthChecksUI(setup =>
            {
                setup
                    .DisableDatabaseMigrations()
                    .AddHealthCheckEndpoint("health_check", "https://localhost:7069/health")
                    .SetEvaluationTimeInSeconds(10)
                    .SetMinimumSecondsBetweenFailureNotifications(30);
            }).AddInMemoryStorage();
        }

        // Add response compression services
        services.AddResponseCompression(options =>
        {
            options.EnableForHttps = true; // Enable compression for HTTPS requests
            options.MimeTypes = ConfigureOptions;
            options.Providers.Add<GzipCompressionProvider>();
            options.Providers.Add<BrotliCompressionProvider>();
        });

        // Configure compression options
        services.Configure<GzipCompressionProviderOptions>(options =>
        {
            options.Level = CompressionLevel.Fastest;
        });

        services.Configure<BrotliCompressionProviderOptions>(options =>
        {
            options.Level = CompressionLevel.Fastest;
        });
        //.AddSingleton<IResponseCacheService, ResponseCacheService>();
        services.AddDbContext<ArticleContext>(opt =>
        {
            opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        });
        //services.AddSingleton<IConnectionMultiplexer>(c =>
        //{
        //    var options = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
        //    return ConnectionMultiplexer.Connect(options);
        //});
        services.AddMigration<ArticleContext>();
        //services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUnitOfWork, UnitOfWork<ArticleContext>>();
        services.AddScoped<IGenericRepository<ArticleEntity>, GenericRepository<ArticleEntity, ArticleContext>>();
        services.AddScoped<IGenericRepository<ReactionEntity>, GenericRepository<ReactionEntity, ArticleContext>>();
        services.AddScoped<IGenericRepository<Comment>, GenericRepository<Comment, ArticleContext>>();
        services.AddScoped<IGenericRepository<Technology>, GenericRepository<Technology, ArticleContext>>();
        services.AddScoped<IGenericRepository<Tag>, GenericRepository<Tag, ArticleContext>>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = actionContext =>
            {
                var errors = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();

                var errorResponse = new ApiValidationErrorResponse
                {
                    Errors = errors
                };
                return new BadRequestObjectResult(errorResponse);
            };
        });
        services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
                options.HttpsPort = 5211;
            });
        services.AddCors(options =>
        {
            options.AddPolicy("allow_web_client",
                policy => { policy
                    .AllowAnyOrigin()
                    //.WithOrigins("https://localhost:7109", "https://localhost:5211", "https://localhost:4224") // Allow all origins for docker (we setup port on docker side)
                    
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    //.AllowCredentials()
                    ; });
        });

        return services;
    }
}

public class HealthHttpMessageHandlerBuilderFilter : IHttpMessageHandlerBuilderFilter
{
    public Action<HttpMessageHandlerBuilder> Configure(Action<HttpMessageHandlerBuilder> next)
    {
        return builder =>
        {
            next(builder);
            builder.PrimaryHandler = new CustomHttpClientHandler();
        };
    }
}
public class CustomHttpClientHandler : HttpClientHandler
{
    public CustomHttpClientHandler()
    {
        ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true;
    }
}