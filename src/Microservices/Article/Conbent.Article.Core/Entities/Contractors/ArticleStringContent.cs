using Conbent.Domain.Common;

namespace Conbent.Article.Core.Entities.Contractors;
public class ArticleStringContent : BaseEntity
{
    public required string Content { get; set; } = string.Empty;
    public ArticleEntity? Article { get; set; }
    public int ArticleId { get; set; }
}
