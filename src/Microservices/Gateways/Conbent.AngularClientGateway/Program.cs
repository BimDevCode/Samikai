using Conbent.AngularClientGateway.Middlewares;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Values;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOcelot();
builder.Configuration.AddJsonFile("ocelot.json");
builder.Services.AddCors(options =>
{
    options.AddPolicy("allow_web_client",
        policy => { policy
            .WithOrigins("https://localhost:5211", "https://localhost:7069", "https://localhost:4224") // Allow all origins for docker (we setup port on docker side)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            ; });
});
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetValue<string>("Redis:Configuration");
});
builder.Services.AddSingleton<IDistributedCache, RedisCache>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseCors("allow_web_client");

app.UseHttpsRedirection();
await app.UseOcelot();

app.UseRouting();
app.UseMiddleware<RedisCacheMiddleware>();
app.Run();
