using Conbent.Article.Core.Enums;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.Common;

namespace Conbent.Article.Core.Entities;

public class ReactionEntity : BaseEntity, IBelongsUser
{
    public ICollection<ArticleEntity>? Articles { get; set; } = [];
    public Reaction Reaction { get; set; } = Reaction.None;
    public string UserId { get; set; } = Guid.NewGuid().ToString();
}
