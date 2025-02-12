using System.Text.Json;
using Conbent.Article.API.Extensions;
using Conbent.Article.API.Hubs;
//using Conbent.Article.API.IntegrationEvents.EventHandling;
//using Conbent.Article.API.IntegrationEvents.Events;
using Conbent.Article.API.Services;
//using Conbent.Article.API.Services.Contractors;
using Conbent.Article.Infrastructure.Context;
using Conbent.CommonInfrastructure.Middleware;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
//using Conbent.EventBus.Extensions;
//using Conbent.EventBusRabbitMQ;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder);
// Add the integration services that consume the DbContext
//builder.Services.AddTransient<IIntegrationEventLogService, IntegrationEventLogService<ArticleContext>>();
//builder.Services.AddTransient<IArticleIntegrationEventService, ArticleIntegrationEventService>();

//builder.AddRabbitMqEventBus("EventBus")
//    .AddSubscription<OrderStatusChangedToAwaitingValidationIntegrationEvent, OrderStatusChangedToAwaitingValidationIntegrationEventHandler>()
//    .AddSubscription<OrderStatusChangedToPaidIntegrationEvent, OrderStatusChangedToPaidIntegrationEventHandler>();

builder.Services.AddSwaggerDocumentation();
builder.Services.AddScoped<ReactionService>();
builder.Services.AddSignalR();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseSwaggerDocumentation();
app.UseStaticFiles();
app.UseDefaultFiles();
app.UseCors("allow_web_client");

app.MapControllers();
app.MapFallbackToController("Index", "Fallback"); 
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseRouting();
// Enable response compression middleware
app.UseResponseCompression();
app.MapHub<ReactionHub>("/reactionhub");
app.UseAuthorization();

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    Predicate = _ => true,
    ResponseWriter = async (context, report) =>
    {
        var result = JsonSerializer.Serialize(
            new
            {
                status = report.Status.ToString(),
                results = report.Entries.Select(e => new { key = e.Key, value = e.Value.Status.ToString() })
            });
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(result);
        await UIResponseWriter.WriteHealthCheckUIResponse(context, report);
    }
});
app.MapHealthChecksUI(setup =>
{
    setup.UIPath = "/health-ui";
});

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var articleContext = services.GetRequiredService<ArticleContext>();
//var logger = services.GetRequiredService<ILogger<Program>>();
//dotnet ef database update  -p Conbent.Article.Infrastructure -s Conbent.Article.API -c ArticleContext 
//dotnet ef migrations add ArticleContextInitial -p Conbent.Article.Infrastructure -s Conbent.Article.API -c ArticleContext -o ArticlesMigration
//dotnet ef migrations remove -p Conbent.Article.Infrastructure -s Conbent.Article.API -c ArticleContext
await articleContext.Database.MigrateAsync();
await ArticleContextSeed.SeedAsync(articleContext);
//await ArticleContextSeed.SeedAsyncWithoutParsing(articleContext);
//dotnet run --configuration Debug --launch-profile https 
app.Run();