using Conbent.Article.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Conbent.Article.Infrastructure.Configurations;
public class CommentsConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.Property(p => p.Id).IsRequired();
        builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
        builder.Property(p => p.UserId).IsRequired();
        builder.Property(p => p.AuthorName).IsRequired();
        builder.Property(p => p.ArticleName).IsRequired();
        builder.Property(p => p.AuthorSurname).IsRequired();
        builder.Property(p => p.ArticleId).IsRequired();
        builder.Property(p => p.HashId).IsRequired();
        builder.Property(p => p.CreatedAt).IsRequired();
        builder.Property(p => p.Content).IsRequired();
    }
}
