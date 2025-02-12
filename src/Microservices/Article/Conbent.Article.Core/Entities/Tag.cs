using Conbent.Domain.Common;

namespace Conbent.Article.Core.Entities;
public class Tag : BaseEntity
{
    public string? Description { get; set; }
    public ICollection<ArticleEntity>? Articles { get; set; }
}
