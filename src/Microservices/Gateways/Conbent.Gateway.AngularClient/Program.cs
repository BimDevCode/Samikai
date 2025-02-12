
using Conbent.CommonInfrastructure.Middleware;
using StackExchange.Redis;
using Hangfire;
using Duende.Bff.Yarp;
using Yarp.ReverseProxy.Configuration;
using Hangfire.InMemory;
using Conbent.Gateway.AngularClient.Middlewares;
using Ocelot.DependencyInjection;
using Ocelot.Values;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddLogging();
builder.Services.AddCors(options =>
{
    options.AddPolicy("allow_web_client",
    policy => {
        policy
            .WithOrigins("https://localhost:5211", "https://localhost:4224") // Allow all origins for docker (we setup port on docker side)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    }
    );
});

builder.Services.AddHealthChecks();
builder.Services.AddHttpClient();
builder.Services.AddSingleton<HttpClient>();

// Configure Redis cache

//builder.Services.AddOcelot().AddRedisCache(options =>
//{
//    options.Configuration = "localhost:6379";
//});
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
    options.InstanceName = "ApiGatewayInstance";
});

// Assuming you have a custom middleware for rate limiting
//builder.Services.AddSingleton<IRateLimitingService, RedisRateLimitingService>();

builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseInMemoryStorage(new InMemoryStorageOptions
    {
        MaxExpirationTime = TimeSpan.FromHours(6) 
    }));

builder.Services.AddHangfireServer();
builder.Services.AddBff();
builder.Services.AddReverseProxy()
    .LoadFromMemory(
        new[]
        {
            new RouteConfig()
            {
                RouteId = "todos",
                ClusterId = "cluster1",
                Match = new()
                {
                    Path = "/todos/{**catch-all}"
                }
            }
        },
        new[]
        {
            new ClusterConfig
            {
                ClusterId = "cluster1",

                Destinations = new Dictionary<string, DestinationConfig>(StringComparer.OrdinalIgnoreCase)
                {
                    {
                        "destination1", new()
                        {
                            Address = "https://api.mycompany.com/todos"
                        }
                    },
                }
            }
        })
    .AddBffExtensions();

var app = builder.Build();
app.UseBff();
// Use Hangfire dashboard for monitoring (optional)
app.UseHangfireDashboard();

app.UseMiddleware<RateLimitMiddleware>();
app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();
app.MapHangfireDashboard();
app.MapBffReverseProxy();
app.UseCors("allow_web_client");
app.UseHttpsRedirection();
await app.UseOcelot();
app.Run();