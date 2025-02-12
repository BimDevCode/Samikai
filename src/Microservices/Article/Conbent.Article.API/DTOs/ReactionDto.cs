
using Conbent.Article.Core.Enums;

namespace Conbent.Article.API.DTOs;

public class ReactionDto
{
    public int ArticleId { get; set; }
    public string Reaction { get; set; }
    public string UserId { get; set; } = Guid.NewGuid().ToString();

}