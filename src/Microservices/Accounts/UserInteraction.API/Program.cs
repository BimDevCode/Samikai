using Conbent.EventBus.Extensions;
using Conbent.EventBusRabbitMQ;
using Conbent.Service.Defaults.Extension;
using Conbent.UserInteraction.API.Data;
using Conbent.UserInteraction.API.IntegrationEvents;
using Conbent.UserInteraction.API.IntegrationEvents.EventHandling;
using Conbent.UserInteraction.API.IntegrationEvents.Events;
using Conbent.UserInteraction.API.Seeds;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<InteractiveUserContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("InteractiveUserDB"));
});

// Apply database migration automatically. Note that this approach is not
// recommended for production scenarios. Consider generating SQL scripts from
// migrations instead.
builder.Services.AddMigration<InteractiveUserContext, UsersSeed>();

builder.Host.UseSerilog((ctx, logger) =>
{
    logger
        .MinimumLevel.Debug()
        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
        .MinimumLevel.Override("System", LogEventLevel.Warning)
        .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
        .WriteTo.Console(
            outputTemplate:
            "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext();
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("allow_web_client",
        policy => { policy
                .WithOrigins("https://localhost:7109", "https://localhost:5211", "https://localhost:4224") // Allow all origins for docker (we setup port on docker side)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                ; });
});

// Add the integration services that consume the DbContext
builder.Services.AddTransient<IIntegrationEventLogService, IntegrationEventLogService<InteractiveUserContext>>();

builder.Services.AddTransient<IUserIntegrationEventService, UserIntegrationEventService>();

builder.AddRabbitMqEventBus("EventBus")
    .AddSubscription<ArticleLikedIntegrationEvent, ArticleLikedIntegrationEventHandler>()
    .AddSubscription<RegisterUserInteractionIntegrationEvent, RegisterUserInteractionIntegrationEventHandler>();

var app = builder.Build();
app.UseSerilogRequestLogging();

app.MapDefaultEndpoints();

app.UseStaticFiles();

app.UseDeveloperExceptionPage();

// This cookie policy fixes login issues with Chrome 80+ using HTTP
app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
app.UseRouting();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.UseCors("allow_web_client");
app.Run();
//dotnet ef migrations add UserContextInitial -c InteractiveUserContext -o Data/Migrations
//dotnet ef database update  -c InteractiveUserContext 
//dotnet run --configuration Debug --launch-profile http