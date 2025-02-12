using System.Reflection;
using Conbent.Article.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Conbent.Article.Infrastructure.Context;
public class ArticleContext(DbContextOptions<ArticleContext> options) : DbContext(options)
{
    public required DbSet<ArticleEntity> Articles { get; set; }
    public required DbSet<Tag> Tags { get; set; }
    public required DbSet<Technology> Technologies { get; set; }
    public required DbSet<AuthorEntity> Authors { get; set; }
    public required DbSet<ImageContent> ImageContents { get; set; }
    public required DbSet<TextContent> TextContents { get; set; }
    public required DbSet<CodeSnippetEntity> CodeSnippets { get; set; }
    public required DbSet<ReactionEntity> ReactionEntities { get; set; }
    public required DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        //{
        //    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        //    {
        //        var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

        //        foreach (var property in properties)
        //        {
        //            modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
        //        }
        //    }
        //}
    }
}
