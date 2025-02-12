//using Conbent.EventBus.Extensions;
//using Conbent.EventBusRabbitMQ;
//using Conbent.Identity.API.IntegrationEvents.Events;
using Conbent.Identity.API.Services.Contractors;
//using Conbent.IntegrationEventLogEF.Services;
using Conbent.Service.Defaults.Extension;
using DPoPApi;
using Duende.IdentityServer.Demo;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddControllersWithViews();

builder.AddNpgsqlDbContext<ApplicationDbContext>("IdentityDB");

//builder.Services.AddTransient<IIntegrationEventLogService, IntegrationEventLogService<ApplicationDbContext>>();
//builder.Services.AddTransient<IIntegrationEventService, IntegrationEventService>();

//builder.AddRabbitMqEventBus("EventBus");

// Apply database migration automatically. Note that this approach is not
// recommended for production scenarios. Consider generating SQL scripts from
// migrations instead.
builder.Services.AddMigration<ApplicationDbContext, UsersSeed>();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

builder.Services.AddIdentityServer(options =>
{
    options.IssuerUri = "http://localhost:5223";
    options.Authentication.CookieLifetime = TimeSpan.FromHours(2);
    options.Events.RaiseErrorEvents = true;
    options.Events.RaiseInformationEvents = true;
    options.Events.RaiseFailureEvents = true;
    options.Events.RaiseSuccessEvents = true;
})
.AddInMemoryApiScopes(Configuration.ApiScopes)
.AddInMemoryIdentityResources(Configuration.IdentityResources)
.AddInMemoryApiResources(Configuration.ApiResources)
.AddInMemoryClients(Configuration.Clients)
.AddAspNetIdentity<ApplicationUser>()
.AddDeveloperSigningCredential()
.AddJwtBearerClientAuthentication();

//.AddInMemoryIdentityResources(Configuration.GetResources())
//.AddInMemoryApiScopes(Configuration.GetApiScopes())
//.AddInMemoryApiResources(Configuration.GetApis())
//.AddInMemoryClients(Configuration.GetClients(builder.Configuration))
//.AddAspNetIdentity<ApplicationUser>()
//.AddDeveloperSigningCredential() // Not recommended for production - you need to store your key material somewhere secure
//.AddJwtBearerClientAuthentication();

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

builder.Services.AddAuthentication()
    .AddLocalApi()
    .AddJwtBearer("dpop", options =>
    {
        //options.Authority = "https://localhost:5001";
        options.Authority = "http://localhost:5223";
        options.TokenValidationParameters.ValidateAudience = false;
        options.MapInboundClaims = false;

        options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
    });
builder.Services.ConfigureDPoPTokensForScheme("dpop", options =>
{
    options.Mode = DPoPMode.DPoPOnly;
});
//.AddOpenIdConnect("Google", "Sign-in with Google", options =>
//{
//    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
//    options.ForwardSignOut = IdentityServerConstants.DefaultCookieAuthenticationScheme;

//    options.Authority = "https://accounts.google.com/";
//    options.ClientId = "708778530804-rhu8gc4kged3he14tbmonhmhe7a43hlp.apps.googleusercontent.com";

//    options.CallbackPath = "/signin-google";
//    options.Scope.Add("email");
//});

builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddTransient<ILoginService<ApplicationUser>, EFLoginService>();
builder.Services.AddTransient<IRedirectService, RedirectService>();
builder.Services.AddTransient<IRedirectUriValidator, DemoRedirectValidator>();
builder.Services.AddTransient<ICorsPolicyService, DemoCorsPolicy>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("allow_web_client",
        policy => { policy
            .AllowAnyOrigin()
            //.WithOrigins("https://localhost:7109", "https://localhost:5211", "https://localhost:4224") // Allow all origins for docker (we setup port on docker side)
            .AllowAnyHeader()
            .AllowAnyMethod()
            //.AllowCredentials()
            ;
        });
});

var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseCors("allow_web_client");

app.MapDefaultEndpoints();

app.UseStaticFiles();

app.UseDeveloperExceptionPage();
app.UseHttpsRedirection();

// This cookie policy fixes login issues with Chrome 80+ using HTTP
app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
app.UseRouting();
app.UseIdentityServer();
app.UseAuthorization();

app.MapDefaultControllerRoute();
app.Run();

//dotnet ef migrations add UserContextInitial -c ApplicationDbContext -o Data
//dotnet ef database update  -c ApplicationDbContext 
//dotnet run --configuration Debug --launch-profile http