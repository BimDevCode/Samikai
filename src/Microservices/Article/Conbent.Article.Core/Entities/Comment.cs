using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.Common;

namespace Conbent.Article.Core.Entities;

public class Comment : BaseEntity, IBelongsUser
{
    public ArticleEntity? Article { get; set; } = null;
    public int ArticleId { get; set; }
    public string ArticleName { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public string AuthorSurname { get; set; } = string.Empty;
    public string UserId { get; set; } = Guid.NewGuid().ToString();
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}