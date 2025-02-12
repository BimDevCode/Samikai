using Conbent.Article.API.Extensions;

namespace WebHost.Extensions;
public static class ArticlesExtensions
{
    public static void AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddControllers();
        services.AddApplicationServices(config);
        services.AddSwaggerDocumentation();
    }

    public static void UseApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {

    }
}